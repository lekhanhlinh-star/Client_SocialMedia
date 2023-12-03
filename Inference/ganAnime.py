import onnxruntime as ort
import numpy as np
from PIL import Image
class ONNX_GAN_ANIME(object):
    def __init__(self ,model_path: str) -> None:
        """
        The model generate photo to anime image

        params:
            - model_path : path onnx file

        """
        self.model_path = model_path

    def __call__(self ,img: Image) -> Image:
        model = ort.InferenceSession(self.model_path ,providers=['CUDAExecutionProvider', 'CPUExecutionProvider'])
        input_data= self.preprocessing(img)
        output = model.run(None ,{"input": input_data})
        image = self.postprocessing(output)
        return image


    def preprocessing(self ,img ,size=512):
        if not isinstance(img ,Image.Image):
            raise ValueError("img is not a PIL Image. It should be a PIL Image.")
        img = img.convert("RGB")
        w ,h = img.size

        # Calculate the size for cropping
        s = min(w ,h)

        # Crop the image to a square shape
        img = img.crop(((w - s) // 2 ,(h - s) // 2 ,(w + s) // 2 ,(h + s) // 2))
        img = img.resize((size ,size))

        # Resize the square image to the desired size
        input_data = np.array(img) / 255.0  # Normalize to [0, 1]
        print(input_data.shape)

        input_data = np.transpose(input_data ,(2 ,0 ,1))  # Change to NCHW format
        input_data = np.expand_dims(input_data ,axis=0)  # Add a batch dimension
        input_data = input_data.astype(np.float32)
        print(input_data.shape)
        return input_data




    def postprocessing(self ,output) -> Image:
        output = (output[0] * 0.5 + 0.5).clip(0 ,1)
        image_data = (np.squeeze(output) * 255.0).clip(0 ,255).astype(np.uint8)
        image_data = np.transpose(image_data ,(1 ,2 ,0))
        return Image.fromarray(image_data)

