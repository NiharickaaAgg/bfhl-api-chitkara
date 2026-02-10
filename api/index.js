const express = require('express');
const app = express();
app.use(express.json());

const YOUR_EMAIL = "niharika1348.be23@chitkarauniversity.edu.in"; 

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// Main BFHL API
app.post('/bfhl', (req, res) => {
  try {
    const body = req.body;
    const keys = Object.keys(body);
    
    // exactly 1 key
    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        error: "Request must contain exactly one key: fibonacci, prime, lcm, hcf, or AI"
      });
    }
    
    const key = keys[0];
    const value = body[key];
    let result;
    
    // Handle different keys
    if (key === 'fibonacci') {
      // Fibonacci logic
      if (!Number.isInteger(value) || value < 0) {
        return res.status(400).json({ 
          is_success: false, 
          error: "Fibonacci needs a non-negative integer" 
        });
      }
      
      let fib = [0, 1];
      for (let i = 2; i <= value; i++) {
        fib.push(fib[i-1] + fib[i-2]);
      }
      result = fib.slice(0, value + 1);
    }
    
    else if (key === 'prime') {
      // Prime numbers logic
      if (!Array.isArray(value)) {
        return res.status(400).json({ 
          is_success: false, 
          error: "Prime needs an array of numbers" 
        });
      }
      
      result = value.filter(num => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) return false;
        }
        return true;
      });
    }
    
    else if (key === 'lcm') {
      // LCM logic
      if (!Array.isArray(value) || value.length === 0) {
        return res.status(400).json({ 
          is_success: false, 
          error: "LCM needs a non-empty array" 
        });
      }
      
      function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
      }
      let lcm = value[0];
      for (let i = 1; i < value.length; i++) {
        lcm = (lcm * value[i]) / gcd(lcm, value[i]);
      }
      result = lcm;
    }
    
    else if (key === 'hcf') {
      // HCF logic
      if (!Array.isArray(value) || value.length === 0) {
        return res.status(400).json({ 
          is_success: false, 
          error: "HCF needs a non-empty array" 
        });
      }
      
      function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
      }
      let hcf = value[0];
      for (let i = 1; i < value.length; i++) {
        hcf = gcd(hcf, value[i]);
      }
      result = hcf;
    }
    
    else if (key === 'AI') {
      // Simple AI response
      if (typeof value !== 'string' || value.trim() === '') {
        return res.status(400).json({ 
          is_success: false, 
          error: "AI needs a text question" 
        });
      }
      
      const aiAnswers = ["Yes", "No", "True", "False", "Maybe", "Unknown", "Possible"];
      result = aiAnswers[Math.floor(Math.random() * aiAnswers.length)];
    }
    
    else {
      // Invalid key
      return res.status(400).json({ 
        is_success: false, 
        error: "Invalid key. Use: fibonacci, prime, lcm, hcf, or AI" 
      });
    }
    
    res.json({
      is_success: true,
      official_email: YOUR_EMAIL, 
      data: Array.isArray(result) ? result : [result]
    });
    
  } catch (error) {
    // Error handling
    res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
});



// Local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
}


module.exports = app;
