const express = require('express');
const router = express.Router();

// Show about page
router.get('/about', (req, res) => {
  res.render('about'); // Renders the about.ejs page
});

module.exports = router;
