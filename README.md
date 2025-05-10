# 🎯 Career Guidance Chatbot

An AI-powered chatbot built with Flask that provides personalized career guidance, job recommendations, resume tips, skill gap analysis, and industry insights. It helps students, graduates, professionals, and career counselors make informed career decisions.

---

## 🚀 Features

- 🔍 Career advice based on user profile and interests
- 📄 Resume analysis and feedback
- 🎯 Skill gap identification and improvement suggestions
- 💼 Real-time job listing integration (Indeed API)
- 📊 Industry trend insights using web scraping and AI
- 🧠 OpenAI integration for smart and contextual responses
- 👤 Support for multiple user personas:
  - Students
  - Graduates
  - Working professionals
  - HR recruiters
  - Career counselors
  - University advisors
  - Freelancers
  - Entrepreneurs
  - Parents
  - Policymakers

---

## 🛠️ Tech Stack

| Layer             | Technologies Used                        |
|------------------|------------------------------------------|
| **Frontend**      | HTML, CSS, JavaScript, Bootstrap         |
| **Backend**       | Python, Flask                            |
| **Database**      | SQLite                                   |
| **AI Integration**| OpenAI API, Sonar Pro (optional)         |
| **Others**        | Web scraping (BeautifulSoup, requests)   |

---

## 🧩 Folder Structure
career-guidance-chatbot/
│
├── static/ # CSS, JS, Images
├── templates/ # HTML templates
│ └── index.html
├── app.py # Main Flask app
├── chatbot/ # AI logic and response generator
│ └── responder.py
├── db/ # SQLite DB and schema
│ └── users.db
├── utils/ # Utility scripts (scraper, resume parser)
├── README.md
└── requirements.txt

Create a Virtual Env

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

python app.py

Create a .env file in the root directory with the following:


OPENAI_API_KEY=your_openai_api_key


