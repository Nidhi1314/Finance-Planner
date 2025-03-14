from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict  # Import prediction function

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask API is running"}), 200

@app.route("/predict", methods=["POST"])
def predict_expense():
    try:
        data = request.get_json()  # Get JSON data from POST request
        result = predict(data)  # Call ML prediction function
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)  # Running on port 5000 or any available port
