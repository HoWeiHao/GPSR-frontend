from flask import Flask, jsonify
from map_display import generate_map

app = Flask(__name__)

@app.route('/api/map')
def get_map():
    map_html = generate_map()
    return jsonify({'map': map_html})

if __name__ == "__main__":
    app.run(debug=True)