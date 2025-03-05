from flask import Flask, request, jsonify

def setup_routes(app):
    @app.route("/", methods=["GET"])
    def home():
        return jsonify({"message": "Welcome to Skill Horizon API!"})

    @app.route("/predict", methods=["POST"])
    def predict():
        data = request.json
        return jsonify({"prediction": "This is a sample response!"})
