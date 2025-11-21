const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// 💡 Correct OpenAI import for CommonJS
const OpenAI = require("openai");

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();
app.use(express.json());
app.use(cors());

// === REAL AI LISTING BOT ENDPOINT ===
app.post("/api/listing", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI real estate expert that recommends luxury properties. Always provide price, beds, baths, location, and style."
        },
        { role: "user", content: message }
      ]
    });

    const aiReply = completion.choices[0].message.content;
    res.json({ reply: aiReply });

  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ reply: "AI connection error." });
  }
});

// === Serve Frontend ===
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
