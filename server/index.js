const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../public')));

app.post('/api/listing', async (req, res) => {
  const { message } = req.body;
  const response = `AI: Based on your request, here's a luxury listing: 123 Ocean View Drive, $3,500,000, 5 Beds, 4 Baths, Oceanfront.`;
  res.json({ reply: response });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
