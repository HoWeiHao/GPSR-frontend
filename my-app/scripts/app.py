from flask import Flask, jsonify, request
from flask_cors import CORS
from map_api import generate_map, add_routes_to_map, _clear_map

app = Flask(__name__)
CORS(app)


@app.route("/api/get_map")
def get_map():
    try:
        map_html = generate_map()
        return jsonify({"map": map_html})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/update_map", methods=["POST"])
def update_map():
    try:
        data = request.json

        if not "routes" in data:
            return jsonify({"error": "Invalid request"}), 400

        map_html = add_routes_to_map(data["routes"])
        return jsonify({"map": map_html})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/clear_map", methods=["POST"])
def clear_map():
    try:
        map_html = _clear_map()
        return jsonify({"map": map_html})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
