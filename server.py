from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import numpy as np
import cv2
import os


app = Flask(__name__)
CORS(app)


# =========================================================
# MODEL PATHS
# =========================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "leaflens_model.tflite"
)

LABELS_PATH = os.path.join(
    BASE_DIR,
    "model",
    "labels.txt"
)


# =========================================================
# CHECK MODEL AND LABEL FILES
# =========================================================

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(
        f"Model file not found: {MODEL_PATH}"
    )

if not os.path.exists(LABELS_PATH):
    raise FileNotFoundError(
        f"Labels file not found: {LABELS_PATH}"
    )


# =========================================================
# LOAD LABELS
# =========================================================

with open(LABELS_PATH, "r", encoding="utf-8") as file:
    labels = [line.strip() for line in file if line.strip()]


# =========================================================
# LOAD TFLITE MODEL
# =========================================================

interpreter = tf.lite.Interpreter(
    model_path=MODEL_PATH
)

interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

input_index = input_details[0]["index"]
output_index = output_details[0]["index"]

input_shape = input_details[0]["shape"]


print("========================================")
print("LeafLens AI Model")
print("========================================")
print("Model loaded successfully")
print("Model path:", MODEL_PATH)
print("Input shape:", input_shape)
print("Number of labels:", len(labels))
print("========================================")


# =========================================================
# IMAGE VALIDATION
# =========================================================

def validate_plant_image(image):
    """
    Basic validation to determine whether the uploaded image
    looks like a plant/leaf image.

    This is a filtering step only.
    It does NOT identify the plant disease.
    """

    # Convert PIL image to RGB
    image = image.convert("RGB")

    # Convert to NumPy
    image_array = np.array(image)

    # OpenCV uses BGR
    img = cv2.cvtColor(
        image_array,
        cv2.COLOR_RGB2BGR
    )

    # ---------------------------------------------
    # 1. Check image size
    # ---------------------------------------------

    height, width = img.shape[:2]

    if width < 100 or height < 100:
        return False, (
            "Image is too small. "
            "Please upload a clear plant image."
        )


    # ---------------------------------------------
    # 2. Check green vegetation
    # ---------------------------------------------

    hsv = cv2.cvtColor(
        img,
        cv2.COLOR_BGR2HSV
    )

    green_mask = cv2.inRange(
        hsv,
        np.array([35, 40, 40]),
        np.array([85, 255, 255])
    )

    green_ratio = (
        cv2.countNonZero(green_mask)
        / green_mask.size
    )


    # ---------------------------------------------
    # 3. Find largest green region
    # ---------------------------------------------

    contours, _ = cv2.findContours(
        green_mask,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    largest_green_ratio = 0

    if contours:

        largest_area = max(
            cv2.contourArea(contour)
            for contour in contours
        )

        image_area = height * width

        if image_area > 0:
            largest_green_ratio = (
                largest_area / image_area
            )


    # ---------------------------------------------
    # 4. Plant-image decision
    # ---------------------------------------------

    if (
        green_ratio < 0.05
        and largest_green_ratio < 0.10
    ):
        return False, (
            "This image does not appear to contain "
            "a plant leaf. Please upload a clear image "
            "of a plant leaf."
        )


    return True, "Plant image detected."


# =========================================================
# PREDICTION FUNCTION
# =========================================================

def predict_image(image):

    # ---------------------------------------------
    # Model expects 224 x 224 RGB
    # ---------------------------------------------

    image = image.convert("RGB")

    image = image.resize(
        (224, 224)
    )


    # ---------------------------------------------
    # Convert image to NumPy
    # ---------------------------------------------

    image_array = np.array(
        image,
        dtype=np.float32
    )


    # ---------------------------------------------
    # MobileNetV2 preprocessing
    # Convert 0-255 pixels to -1 to 1
    # ---------------------------------------------



    # ---------------------------------------------
    # Add batch dimension
    # ---------------------------------------------

    image_array = np.expand_dims(
        image_array,
        axis=0
    )


    # ---------------------------------------------
    # Send image to model
    # ---------------------------------------------

    interpreter.set_tensor(
        input_index,
        image_array
    )

    interpreter.invoke()


    # ---------------------------------------------
    # Get predictions
    # ---------------------------------------------

    predictions = interpreter.get_tensor(
        output_index
    )[0]


    # ---------------------------------------------
    # Get top 3 predictions
    # ---------------------------------------------

    top_indices = np.argsort(
        predictions
    )[::-1][:3]


    results = []

    for index in top_indices:

        confidence = float(
            predictions[index]
        )

        results.append({
            "disease": labels[index],
            "confidence": round(
                confidence * 100,
                2
            )
        })


    return results


# =========================================================
# HOME
# =========================================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "message": "LeafLens AI backend is running"
    })


# =========================================================
# TEST PAGE
# =========================================================

@app.route("/test", methods=["GET"])
def test_page():

    return """
    <!DOCTYPE html>
    <html>

    <head>
        <title>LeafLens AI Test</title>
    </head>

    <body style="
        font-family: Arial;
        padding: 40px;
        text-align: center;
    ">

        <h1>LeafLens AI Test</h1>

        <p>Select a plant image to test the AI model.</p>

        <form
            action="/predict"
            method="POST"
            enctype="multipart/form-data"
        >

            <input
                type="file"
                name="image"
                accept="image/*"
                required
            >

            <br><br>

            <button
                type="submit"
                style="
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                "
            >
                Test Prediction
            </button>

        </form>

    </body>

    </html>
    """


# =========================================================
# PREDICTION API
# =========================================================

@app.route("/predict", methods=["POST"])
def predict():

    # ---------------------------------------------
    # Check image
    # ---------------------------------------------

    if "image" not in request.files:

        return jsonify({
            "success": False,
            "error": "No image provided."
        }), 400


    file = request.files["image"]


    if file.filename == "":

        return jsonify({
            "success": False,
            "error": "No image selected."
        }), 400


    try:

        # -----------------------------------------
        # Open image
        # -----------------------------------------

        image = Image.open(
            file.stream
        )


        # -----------------------------------------
        # Validate plant image
        # -----------------------------------------

        is_plant, validation_message = (
            validate_plant_image(image)
        )


        if not is_plant:

            return jsonify({
                "success": False,
                "type": "invalid_image",
                "message": validation_message,
                "predictions": []
            }), 200


        # -----------------------------------------
        # Run disease prediction
        # -----------------------------------------

        results = predict_image(image)


        # -----------------------------------------
        # Check prediction
        # -----------------------------------------

        if not results:

            return jsonify({
                "success": False,
                "type": "low_confidence",
                "message": "No confident prediction found.",
                "predictions": []
            }), 200


        # -----------------------------------------
        # Successful prediction
        # -----------------------------------------

        return jsonify({
            "success": True,
            "type": "plant_prediction",
            "message": "LeafLens analyzed your image.",
            "predictions": results
        }), 200


    except Exception as error:

        print(
            "Prediction error:",
            error
        )

        return jsonify({
            "success": False,
            "type": "server_error",
            "error": str(error)
        }), 500


# =========================================================
# START SERVER
# =========================================================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )