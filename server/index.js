const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// REAL OPENAI POWERED LISTING BOT
import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/listing', async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a real estate AI that recommends luxury listings based on user requests." },
        { role: "user", content: message }
      ]
    });

    const aiReply = completion.choices[0].message.content;
    res.json({ reply: aiReply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error connecting to AI." });
  }
});


  

// Serve homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
