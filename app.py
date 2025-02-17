from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import json

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load trained model
MODEL_PATH = "plant_disease_prediction_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

# Load class indices
with open("class_indices.json", "r") as f:
    class_indices = json.load(f)
    class_labels = {int(k): v for k, v in class_indices.items()}  # Convert keys to int

# Image Preprocessing
def preprocess_image(image):
    img = image.resize((224, 224))  # Resize to match model input size
    img_array = np.array(img) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    try:
        image = Image.open(file)
        processed_image = preprocess_image(image)

        # Make prediction
        predictions = model.predict(processed_image)
        predicted_class_index = np.argmax(predictions, axis=1)[0]
        predicted_class_name = class_labels[predicted_class_index]

        return jsonify({"prediction": predicted_class_name})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
