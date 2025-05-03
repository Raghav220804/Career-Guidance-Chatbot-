from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import sqlite3
from openai import OpenAI
from dotenv import load_dotenv
import os
CORS(app, origins=["https://careerguidancechatbot.netlify.app", "http://localhost:3000"])

load_dotenv()

# Flask App Setup
app = Flask(__name__)
CORS(app)

# Connect to SQLite Database
conn = sqlite3.connect("chatbot.db", check_same_thread=False)
cursor = conn.cursor()

# Create table if not exists
cursor.execute('''CREATE TABLE IF NOT EXISTS queries (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_input TEXT,
                    bot_response TEXT)''')
conn.commit()

# OpenAI API (Perplexity) Key - Replace with your actual key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=OPENAI_API_KEY, base_url="https://api.perplexity.ai")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    if request.content_type == 'application/json':  # JSON request
        data = request.get_json()
        user_input = data.get('message', '')
    else:  # Form request
        user_input = request.form.get('message', '')

    # OpenAI API (Perplexity) - Get AI Response
    messages = [
        {"role": "system", "content": "You are an AI assistant that provides helpful and detailed answers."},
        {"role": "user", "content": user_input},
    ]

    try:
        ai_response = client.chat.completions.create(
            model="sonar-pro",
            messages=messages
        )
        response_text = ai_response.choices[0].message.content.strip()
    except Exception as e:
        response_text = f"AI Error: {str(e)}"

    # Store the conversation in SQLite
    cursor.execute("INSERT INTO queries (user_input, bot_response) VALUES (?, ?)", (user_input, response_text))
    conn.commit()

    return jsonify({"response": response_text})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
