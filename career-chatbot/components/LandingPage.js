import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ onStartChat }) => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* ======= TOP RIGHT NAV BUTTONS ======= */}
      <div className="nav-buttons">
        <button className="nav-btn" onClick={() => navigate("/signin")}>Sign In</button>
        <button className="nav-btn" onClick={() => navigate("/signup")}>Sign Up</button>
      </div>

      {/* Moving Stars Background */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">AI-Powered Career Guidance</h1>
        <p className="hero-subtitle">
          Get personalized career insights, job recommendations, and resume feedback(under dev).
        </p>
        <button className="hero-button" onClick={onStartChat}>
          Try the Chatbot
        </button>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="features-title">Why Choose Our Chatbot?</h2>
        <div className="features-grid">
          <div className="feature-box">
            <h3>AI-Driven Insights</h3>
            <p>Receive career advice based on real-time market trends.</p>
          </div>

          <div className="feature-box">
            <h3>Job Matching</h3>
            <p>Find the best jobs that align with your skills and interests.</p>
          </div>

          <div className="feature-box">
            <h3>Industry Trends</h3>
            <p>Stay updated with the latest insights in your field.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <div className="footer">
        <div className="footer-section">
          <h3>About</h3>
          <p>
            We use AI to help you make smarter career choices with personalized guidance and real-time insights.
          </p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email us at: raghavbohra8287@gmail.com</p>
          <p>Phone: +91 873492021</p>
        </div>
        <div className="footer-section">
          <h3>Support Us</h3>
          <p>
            If you love what we're doing, consider supporting us by donating!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
