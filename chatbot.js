function toggleChatbot() {
  const bot = document.getElementById('chatbot');
  bot.style.display = bot.style.display === 'flex' ? 'none' : 'flex';
}

function sendChat(event) {
  if (event.key === 'Enter') {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (!message) return;

    const messages = document.getElementById('chatbot-messages');
    messages.innerHTML += `<div class="user-msg"><strong>You:</strong> ${message}</div>`;

    // Simple chatbot replies
    let reply = "I'm here to help! Please specify your query.";
    if (message.toLowerCase().includes("blood")) {
      reply = "You can find blood donors under the 'Donors' section.";
    } else if (message.toLowerCase().includes("hospital")) {
      reply = "Nearby hospitals are listed under 'Hospitals'.";
    }

    messages.innerHTML += `<div class="bot-msg"><strong>Bot:</strong> ${reply}</div>`;
    input.value = "";
    messages.scrollTop = messages.scrollHeight;
  }
}
