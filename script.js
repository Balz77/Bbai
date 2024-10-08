document.getElementById('send-btn').addEventListener('click', async function() {
    const userInput = document.getElementById('user-input').value;

    if (userInput.trim() === '') return;

    // Add the user message to the chat box
    addMessageToChat(userInput, 'user');

    // Clear input field
    document.getElementById('user-input').value = '';

    try {
        // Call the API with the user's input
        const response = await fetch(`https://teleserviceapi.vercel.app/gpt?text=${encodeURIComponent(userInput)}&type=bbai`);
        const data = await response.json();

        // Add the bot's response to the chat box
        if (data.status === "success") {
            addMessageToChat(data.message, 'bot');
        } else {
            addMessageToChat('Error: Something went wrong', 'bot');
        }
    } catch (error) {
        addMessageToChat('Error: Unable to reach the server', 'bot');
    }
});

// Function to add a message to the chat box
function addMessageToChat(message, sender) {
    const chatBox = document.getElementById('chat-box');

    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
