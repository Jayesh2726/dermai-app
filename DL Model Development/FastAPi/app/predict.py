import numpy as np
from PIL import Image
import io
from model_loader import load_model

IMAGE_SIZE = (224, 224)

def preprocess_image(image_bytes: bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize(IMAGE_SIZE)
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

def predict(image_bytes: bytes):
    model = load_model()
    processed_image = preprocess_image(image_bytes)
    prediction = model.predict(processed_image)
    return prediction.tolist()
