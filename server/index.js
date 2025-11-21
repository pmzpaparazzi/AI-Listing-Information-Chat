const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const OpenAI = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
app.use(express.json());
app.use(cors());

// Serve frontend
app.use(express.static(path.join(__dirname, '../public')));

// Real AI Listing Bot
app.post('/api/listing', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",   // fast & cheap, upgrade anytime
      messages: [
        {
          role: "system",
          content: `You are a luxury real estate AI. Provide premium listing recommendations and detailed information.
          Always give high-end, luxury style properties unless asked otherwise.
          Response format: short property description, price, beds/baths, and unique features.`
        },
        { role: "user", content: message }
      ]
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.json({ reply: "Error communicating with AI. Check OpenAI API key." });
  }
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AI Listing Bot running on port ${PORT}`));
