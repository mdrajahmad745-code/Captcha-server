const express = require('express');
const cors = require('cors');
const Tesseract = require('tesseract.js');
const app = express();
app.use(cors());
app.use(express.json({limit: '10mb'}));
app.post('/api/captcha', async (req, res) => {
  try {
    const result = await Tesseract.recognize(req.body.image_url, 'eng');
    const clean = result.data.text.replace(/[^A-Z0-9a-z]/g, '').trim();
    res.json({ solution: clean });
  } catch (err) {
    res.json({ solution: null });
  }
});
app.get('/', (req, res) => res.send('API Running OK'));
app.listen(process.env.PORT || 3000);
