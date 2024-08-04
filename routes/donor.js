const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const csv = require('csv-parser');
const session = require('express-session');
const donorController = require('../controllers/donorController');

// Setup session middleware
router.use(session({
  secret: 'your_secret_key',  // Replace with a strong secret key
  resave: false,
  saveUninitialized: true
}));

// Show login page
router.get('/login', (req, res) => {
  res.render('donor/login');
});

// Handle login POST request
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const filePath = path.join(__dirname, '../data/donors.csv');

  try {
    const userFound = await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          if (row.username === username && row.password === password) {
            resolve(true);
          }
        })
        .on('end', () => resolve(false))
        .on('error', reject);
    });

    if (userFound) {
      req.session.loggedIn = true;
      res.redirect('/donor/dashboard');
    } else {
      res.redirect('/donor/login');
    }
  } catch (error) {
    console.error('Error reading CSV file:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Donor registration routes
router.route('/register')
  .get((req, res) => res.render('donor/register'))
  .post(donorController.registerDonor);

// Donor dashboard route
router.get('/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    res.render('donor/dashboard');
  } else {
    res.redirect('/donor/login');
  }
});

// Donation form route
router.get('/donation-form', (req, res) => {
  if (req.session.loggedIn) {
    res.render('donor/donation-form');
  } else {
    res.redirect('/donor/login');
  }
});

// Define the logout route
router.get('/logout', donorController.logout);

module.exports = router;
