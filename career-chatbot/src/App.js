import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LandingPage from "./components/LandingPage";
import ReactMarkdown from "react-markdown";

// Sign In Page
function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h2 className="text-3xl font-bold mb-6">Sign In</h2>
      <form className="w-full max-w-sm bg-gray-900 p-6 rounded-lg">
        <input type="email" placeholder="Email" className="w-full p-2 mb-4 rounded bg-gray-800 text-white" />
        <input type="password" placeholder="Password" className="w-full p-2 mb-4 rounded bg-gray-800 text-white" />
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">Sign In</button>
      </form>
    </div>
  );
}

// Sign Up Page
function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
      <form className="w-full max-w-sm bg-gray-900 p-6 rounded-lg">
        <input type="text" placeholder="Full Name" className="w-full p-2 mb-4 rounded bg-gray-800 text-white" />
        <input type="email" placeholder="Email" className="w-full p-2 mb-4 rounded bg-gray-800 text-white" />
        <input type="password" placeholder="Password" className="w-full p-2 mb-4 rounded bg-gray-800 text-white" />
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}

function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setHistory((prev) => [...prev, input]);
    setInput("");

    try {
      const response = await axios.post("https://career-guidance-chatbot-jhim.onrender.com/", {
        message: input,
      });

      setMessages([...newMessages, { text: response.data.response, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...newMessages, { text: "Error connecting to chatbot!", sender: "bot" }]);
    }
  };

  return (
    <>
      <div className="sidebar">
        <h3>Chat History</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index} onClick={() => setInput(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-container">
        <h2 className="chat-title">Career Guidance Chatbot</h2>
        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === "user" ? "user-message" : "bot-message"}>
              {msg.sender === "bot" ? (
                <div className="bot-message">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                <p className="user-message">{msg.text}</p>
              )}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask a career question..."
          />
          <button onClick={sendMessage}>
            <FiSend />
          </button>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPageLink />} />
          <Route path="/chat" element={<ChatbotPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

function LandingPageLink() {
  const navigate = useNavigate();
  return <LandingPage onStartChat={() => navigate("/chat")} />;
}

export default App;
