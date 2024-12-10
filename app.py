from flask import Flask, jsonify
import requests
from flask_cors import CORS

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
        # Make the GET request to the Indeed API
        response = requests.get(url, headers=headers, params=params)

        # Check if the response was successful
        if response.status_code == 200:
            data = response.json()

            # Return the job listings as a JSON response
            return jsonify(data), 200
        else:
            return jsonify({"error": "Failed to fetch jobs"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
