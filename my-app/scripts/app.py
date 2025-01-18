from flask import Flask, jsonify, request
from flask_cors import CORS
from generate_map import generate_map, add_routes_to_map

app = Flask(__name__)
CORS(app)


@app.route("/api/get_map")
def get_map():
    map_html = generate_map()
    return jsonify({"map": map_html})


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


if __name__ == "__main__":
    app.run(debug=True)
