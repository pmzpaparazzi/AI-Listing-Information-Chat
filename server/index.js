const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// ✅ OpenAI imported correctly for CommonJS (NO import keyword!)
const OpenAI = require("openai");
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();
app.use(express.json());
app.use(cors());

// ===============================
// REAL OPENAI LISTING BOT
// ===============================
app.post("/api/listing", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a luxury real estate AI assistant. Provide premium property listings with price, location, style, and features."
        },
        { role: "user", content: message }
      ]
    });

    const aiReply = completion.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (err) {
    console.error("❌ OPENAI ERROR", err);
    res.status(500).json({ reply: "Error connecting to AI." });
  }
});

// ===============================
// SERVE FRONTEND
// ===============================
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// ===============================
// START SERVER
// ===============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
