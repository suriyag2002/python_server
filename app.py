from flask import Flask, jsonify
import requests
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    url = "https://indeed46.p.rapidapi.com/job"
    headers = {
        'x-rapidapi-key': 'd21e8a9c0amsha1889099535d677p1f8a59jsna6471b3dc4a2',
        'x-rapidapi-host': 'indeed46.p.rapidapi.com'
    }
    params = {
        'country': 'CA',
        'sort': '-1',
        'page_size': '10'
    }

    try:
        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 200:
            data = response.json()
            return jsonify(data), 200
        else:
            return jsonify({"error": "Failed to fetch jobs"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Bind to the port specified by Render
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
