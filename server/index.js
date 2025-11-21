const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// ✔ RIGHT OpenAI import for CJS (Railway)
const OpenAI = require("openai");

const app = express();
app.use(express.json());
app.use(cors());

// ✔ OpenAI Client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ========= AI LISTING BOT ENDPOINT =========
app.post("/api/listing", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a real estate AI that recommends luxury listings. Include property details, price, location, and unique features."
        },
        { role: "user", content: message }
      ]
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error("AI Error:", err.message);
    res.status(500).json({ reply: "AI server error." });
  }
});

// ========= SERVE FRONTEND =========
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// ========= RAILWAY REQUIRED PORT =========
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);

