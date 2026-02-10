const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ status: 'Server is running' });
});

module.exports = app;