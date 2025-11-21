const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// REAL OPENAI POWERED LISTING BOT (CJS VERSION FOR RAILWAY)
const OpenAI = require("openai");
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/listing", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a luxury real estate AI assistant." },
        { role: "user", content: message }
      ]
    });

    const aiReply = completion.choices[0].message.content;
    res.json({ reply: aiReply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "AI error occurred." });
  }
});


// === Serve Frontend ===
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
