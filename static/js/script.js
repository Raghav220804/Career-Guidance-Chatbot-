document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const themeToggle = document.getElementById("theme-toggle");

    // Function to send message
    function sendMessage() {
        let message = userInput.value.trim();
        if (!message) return;

        // Append user message
        let userMessage = document.createElement("div");
        userMessage.classList.add("message", "user-message");
        userMessage.textContent = message;
        chatBox.appendChild(userMessage);

        // Send to backend
        fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            // Append bot response
            let botMessage = document.createElement("div");
            botMessage.classList.add("message", "bot-message");
            botMessage.textContent = data.response;
            chatBox.appendChild(botMessage);
        })
        .catch(error => console.error("Error:", error));

        userInput.value = "";
    }

    // Event listeners for message sending
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });

    // Dark mode toggle
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
        localStorage.setItem("darkMode", isDarkMode);
    });

    // Load dark mode preference
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }
});
