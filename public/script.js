async function sendMsg() {
  const chat = document.getElementById("chat");
  const msg = document.getElementById("msg").value;

  if (!msg) return;
  chat.innerHTML += `<p><strong>You:</strong> ${msg}</p>`;
  document.getElementById("msg").value = "";

  const r = await fetch("/api/listing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });

  const data = await r.json();
  chat.innerHTML += `<p><strong>AI:</strong> ${data.reply}</p>`;
  chat.scrollTop = chat.scrollHeight;
}
