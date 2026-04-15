from flask import request, jsonify, Flask
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()

    history = data.get("history", [])

    if not history:
        return jsonify({"error": "No message provided"}), 400

    try:
        # Convert history into Gemini format
        contents = []

        for msg in history:
            role = "user" if msg["role"] == "user" else "model"

            contents.append({
                "role": role,
                "parts": [{"text": msg["content"]}]
            })

        # Generate response
        response = client.models.generate_content(
        model = "models/gemini-2.0-flash-lite",
        contents=contents
        )

        return jsonify({"response": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)