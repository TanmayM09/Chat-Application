const chatOutput = document.getElementById("chat-output");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Create a WebSocket connection
const socket = new WebSocket("wss://localhost:8080"); 

// Event handler for when the WebSocket connection is opened
socket.addEventListener("open", (event) => {
    chatOutput.innerHTML += "<div>Connected to the server.</div>";
});

// Event handler for receiving messages from the server
socket.addEventListener("message", (event) => {
    const message = event.data;
    chatOutput.innerHTML += `<div>${message}</div>`;
    // Scroll to the bottom to show the latest message
    chatOutput.scrollTop = chatOutput.scrollHeight;
});

// Event handler for sending a message
sendButton.addEventListener("click", () => {
    const message = messageInput.value;
    if (message.trim() !== "") {
        socket.send(message);
        messageInput.value = "";
    }
});

// Event handler for handling Enter key press
messageInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        sendButton.click();
    }
});

// Event handler for when the WebSocket connection is closed
socket.addEventListener("close", (event) => {
    chatOutput.innerHTML += "<div>Connection closed.</div>";
});
