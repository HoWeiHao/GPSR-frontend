from flask import Flask, jsonify
from flask_cors import CORS
from generate_map import generate_map

app = Flask(__name__)
CORS(app)

@app.route('/api/map')
def get_map():
    map_html = generate_map()
    return jsonify({'map': map_html})

if __name__ == "__main__":
    app.run(debug=True)