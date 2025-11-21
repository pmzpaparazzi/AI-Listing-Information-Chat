
async function sendMsg(){
  const chat=document.getElementById("chat");
  const msg=document.getElementById("msg").value;
  if(!msg) return;

  chat.innerHTML += "<p class='user'>You: "+msg+"</p>";
  document.getElementById("msg").value="";

  const res = await fetch("/api/listing",{
    method:"POST",
    headers:{ "Content-Type":"application/json"},
    body:JSON.stringify({message:msg})
  });
  const data = await res.json();
  chat.innerHTML += "<p class='ai'>AI: "+data.reply+"</p>";
  chat.scrollTop = chat.scrollHeight;
}
