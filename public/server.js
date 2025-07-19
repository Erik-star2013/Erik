const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/api/ask', async (req, res) => {
  const { question } = req.body;

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: question }]
    })
  });

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content || '🤖 Я завис...';

  res.json({ answer });
});

app.listen(PORT, () => {
  console.log(`🚀 ЭрикНейро работает на http://localhost:${PORT}`);
});
