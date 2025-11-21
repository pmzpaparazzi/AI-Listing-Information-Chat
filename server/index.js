const OpenAI = require("openai");
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

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

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "AI error. Check API key or server logs." });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server running on", PORT));
