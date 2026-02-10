const express = require('express');
const app = express();
app.use(express.json());

const YOUR_EMAIL = "niharika1348.be23@chitkarauniversity.edu.in";

// Health endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// BFHL endpoint  
app.post('/bfhl', (req, res) => {
  const body = req.body;
  const key = Object.keys(body)[0];
  const value = body[key];
  
  if (key === 'fibonacci') {
    let fib = [0, 1];
    for (let i = 2; i <= value; i++) fib.push(fib[i-1] + fib[i-2]);
    res.json({
      is_success: true,
      official_email: YOUR_EMAIL,
      data: fib.slice(0, value + 1)
    });
  }
  else {
    
    res.json({
      is_success: true,
      official_email: YOUR_EMAIL,
      data: ["Test response"]
    });
  }
});


module.exports = app;