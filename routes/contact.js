const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Show contact page
router.get('/contact', (req, res) => {
  res.render('contact'); // Renders the contact.ejs page
});

// Handle contact form submission
router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Path to save data
  const filePath = path.join(__dirname, '../data/contacts.csv');

  // Write data to CSV file
  fs.appendFile(filePath, `${name},${email},${message}\n`, (err) => {
    if (err) {
      console.error('Error saving contact data', err);
      res.redirect('/contact'); // Redirect back to contact page on error
    } else {
      res.redirect('/thank-you'); // Redirect to a thank you page on success
    }
  });
});

module.exports = router;
