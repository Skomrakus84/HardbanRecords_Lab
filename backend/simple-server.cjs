const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Prosty endpoint testowy
app.get('/api/data', (req, res) => {
  res.json({ 
    message: 'Backend działa!',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    success: true,
    data: 'Test endpoint działa'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Prosty serwer działa na porcie ${PORT}`);
});
