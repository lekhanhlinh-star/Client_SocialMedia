import numpy as np
import onnxruntime as rt

import os
from PIL import Image



class onnx_yolo:

    def __init__(self, path_model_onnx):
        self.path_model = path_model_onnx
        self.model_onnx = self.load_model()

    def load_model(self, cuda=True):
        if cuda:
            session = rt.InferenceSession(self.path_model, providers=['CUDAExecutionProvider'])
            return session
        else:
            session = rt.InferenceSession(self.path_model, providers=['CPUExecutionProvider'])
            return session

    @staticmethod
    def intersection(box1, box2):
        box1_x1, box1_y1, box1_x2, box1_y2 = box1[:4]
        box2_x1, box2_y1, box2_x2, box2_y2 = box2[:4]
        x1 = max(box1_x1, box2_x1)
        y1 = max(box1_y1, box2_y1)
        x2 = min(box1_x2, box2_x2)
        y2 = min(box1_y2, box2_y2)
        return (x2 - x1) * (y2 - y1)

    def union(self, box1, box2):
        box1_x1, box1_y1, box1_x2, box1_y2 = box1[:4]
        box2_x1, box2_y1, box2_x2, box2_y2 = box2[:4]
        box1_area = (box1_x2 - box1_x1) * (box1_y2 - box1_y1)
        box2_area = (box2_x2 - box2_x1) * (box2_y2 - box2_y1)
        return box1_area + box2_area - self.intersection(box1, box2)

    def iou(self, box1, box2):
        return self.intersection(box1, box2) / self.union(box1, box2)

    @staticmethod
    def preprocess_input(img: Image) -> object:
        img = img.convert("RGB")
        img = img.resize((640, 640))
        img_width, img_height = img.size

        input_data = np.array(img)
        input_data = input_data.transpose(2, 0, 1)
        input_data = input_data.reshape(1, 3, 640, 640).astype("float32")
        input_data = input_data / 255.0
        return input_data, img_width, img_height

    def extract_results(self, outputs: np.array, class_names, img_width, img_height, conf=0.5, iou=0.7):
        outputs = outputs.transpose()
        boxes = outputs[:, 0:84]
        objects = []
        for row in boxes:
            prob = row[4:84].max()
            if prob < conf:
                continue
            xc, yc, w, h = row[:4]
            x1 = (xc - w / 2) / 640 * img_width
            y1 = (yc - h / 2) / 640 * img_height
            x2 = (xc + w / 2) / 640 * img_width
            y2 = (yc + h / 2) / 640 * img_height

            class_id = row[4:84].argmax()
            objects.append([x1[0], y1[0], x2[0], y2[0], class_id, prob])
        objects.sort(key=lambda x: x[5], reverse=True)
        result = []

        while len(objects) > 0:
            result.append(objects[0])
            objects = [_object for _object in objects if self.iou(_object, objects[0]) < iou]

        if len(result) != 0:
            result = np.array(result).astype(float)
            boxes = result[:, :4]
            class_idx = result[:, 4]
            confidence_scores = result[:, -1]
            class_names = [class_names[idx] for idx in list(class_idx.astype("int"))]
            return [{"boxes": boxes}, {"labels": class_names}, {"confident_score": confidence_scores}]

        return result

    def __call__(self, input_image: Image, class_name: list, conf=0.5, iou=0.7):
        input_data, img_width, img_height = self.preprocess_input(input_image)

        outputs = self.model_onnx.run(None, {"images": input_data})[0]
        return self.extract_results(outputs, class_name, img_width, img_height, conf, iou)
