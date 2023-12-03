import io
import os

os.environ['KMP_DUPLICATE_LIB_OK'] = "TRUE"
import numpy as np
from PIL import Image
from fastapi import FastAPI ,Response ,UploadFile
from fastapi.responses import FileResponse
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from Inference.ganAnime import ONNX_GAN_ANIME
from Inference.nude import NudeDetector
from Inference.nineLine import onnx_yolo
from fastapi.middleware.cors import CORSMiddleware
import base64


origins = ["http://0.0.0.0:5000","http://localhost:5000","0.0.0.0:5000","http://localhost:3000","http://127.0.0.1:3000","http://127.0.0.1:5000/", "http://0.0.0.0:3000"]


app = FastAPI()
app.add_middleware(CORSMiddleware 
                   ,allow_origins=origins 
                   ,allow_credentials=True ,allow_methods=["*"] ,
    allow_headers=["*"] ,)
root_path = "weights"
print("=" * 20 + " Load model " + "=" * 20)
model_nineline = onnx_yolo(os.path.join(root_path ,"best.onnx"))

model_GAN_ANIME = ONNX_GAN_ANIME(os.path.join(root_path ,"animegan2_face_paint_512.onnx"))
model_nude = NudeDetector(os.path.join(root_path ,"best_nude.onnx"))


@app.post("/upload/")
async def upload_file(file: UploadFile):
    try:
        # Check if the uploaded file is an image
        print("file" ,file.file)
        if not file.content_type.startswith("image/"):
            return JSONResponse(content={"message": "Uploaded file is not an image"} ,status_code=400)

        # Read the image content
        image_bytes = file.file.read()

        # Process the image (e.g., resize or apply some operations)
        image = Image.open(io.BytesIO(image_bytes))

        predict = model_nineline(image ,["Nine-line"])
        if len(predict) <= 0:
            return JSONResponse(content={"message": jsonable_encoder(predict)} ,status_code=200)

        # Modify the image here as needed
        for item in predict:
            for key ,value in item.items():
                if isinstance(value ,np.ndarray):
                    item[key] = value.tolist()

        return JSONResponse(content={"message": jsonable_encoder(predict)} ,status_code=200)
    except Exception as e:
        return JSONResponse(content={"message": f"Error: {str(e)}"} ,status_code=500)


@app.post("/api/v1/generateAI")
async def upload_image(file: UploadFile):
    try:
        # Check if the uploaded file is an image
        print("file" ,file.file)
        if not file.content_type.startswith("image/"):
            return JSONResponse(content={"message": "Uploaded file is not an image"} ,status_code=400)

        # Read the image content
        image_bytes = file.file.read()

        # Process the image (e.g., resize or apply some operations)
        image = Image.open(io.BytesIO(image_bytes))
        generated_image: Image = model_GAN_ANIME(image)
        generated_image_bytes = io.BytesIO()
        file_name = "output.png"
        generated_image.save(file_name ,format="PNG")
        response = FileResponse(file_name, media_type="image/png", filename=file_name)

        # Return the generated image as a response
        return response



    except Exception as e:
        return JSONResponse(content={"message": f"Error: {str(e)}"} ,status_code=500)


@app.post("/api/v1/validateImage")
async def upload_image(file: UploadFile):
    try:
        # Check if the uploaded file is an image
        print("file" ,file.file)
        if not file.content_type.startswith("image/"):
            return JSONResponse(content={"message": "Uploaded file is not an image"} ,status_code=400)

        # Read the image content
        image_bytes = file.file.read()

        # Process the image (e.g., resize or apply some operations)
        image = Image.open(io.BytesIO(image_bytes))
        predict = model_nude(image)
        print(predict)
        for i in predict:
            if 'EXPOSED' in i["class"] and i["class"] != "BELLY_EXPOSED" and i["score"] >= 0.6:

                return JSONResponse(content={"messsge": 0})

        return JSONResponse(content={"message": 1} ,status_code=200)

        # Return the generated image as a response




    except Exception as e:
        return JSONResponse(content={"message": f"Error: {str(e)}"} ,status_code=500)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app" ,host="0.0.0.0" ,port=8000 ,reload=True)
