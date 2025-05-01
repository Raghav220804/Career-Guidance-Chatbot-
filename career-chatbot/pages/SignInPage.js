import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    // Dummy credentials (you can replace with backend/API later)
    const dummyUser = {
      email: "test@example.com",
      password: "123456",
    };

    if (email === dummyUser.email && password === dummyUser.password) {
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/chat");
    } else {
      setError("Invalid credentials. Try test@example.com / 123456");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign In</button>
      </form>
      <p>
        New user? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  );
}

export default SignInPage;
