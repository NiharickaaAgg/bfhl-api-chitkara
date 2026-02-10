const express = require('express');
const app = express();
app.use(express.json());

const YOUR_EMAIL = "niharika1348.be23@chitkarauniversity.edu.in";

app.post('/', (req, res) => {
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
  else if (key === 'prime') {
    const primes = value.filter(n => {
      if (n < 2) return false;
      for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
      return true;
    });
    res.json({ is_success: true, official_email: YOUR_EMAIL, data: primes });
  }
  else if (key === 'lcm') {
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    let lcm = value[0];
    for (let i = 1; i < value.length; i++) lcm = (lcm * value[i]) / gcd(lcm, value[i]);
    res.json({ is_success: true, official_email: YOUR_EMAIL, data: [lcm] });
  }
  else if (key === 'hcf') {
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    let hcf = value[0];
    for (let i = 1; i < value.length; i++) hcf = gcd(hcf, value[i]);
    res.json({ is_success: true, official_email: YOUR_EMAIL, data: [hcf] });
  }
  else if (key === 'AI') {
    const answers = ["Yes", "No", "True", "False", "Maybe"];
    res.json({ is_success: true, official_email: YOUR_EMAIL, data: [answers[Math.floor(Math.random() * answers.length)]] });
  }
  else {
    res.status(400).json({ is_success: false, error: "Invalid key" });
  }
});

module.exports = app;