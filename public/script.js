const chatWindow = document.getElementById('chatWindow');
const userInput = document.getElementById('userInput');

function appendMessage(msg, sender) {
  const p = document.createElement('p');
  p.textContent = msg;
  p.className = sender;
  chatWindow.appendChild(p);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;
  appendMessage(message, 'user');
  userInput.value = '';

  const res = await fetch('/api/listing', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ message })
  });
  const data = await res.json();
  appendMessage(data.reply, 'ai');
}
