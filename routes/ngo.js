const express = require('express');
const router = express.Router();
const ngoController = require('../controllers/ngoController');

// Middleware to ensure that the user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.session && req.session.ngoId) {
    return next();
  }
  res.redirect('/ngo/login'); // Redirect to login if not authenticated
};

// Serve the NGO dashboard page
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('ngo/dashboard'); // Ensure 'ngo/dashboard.ejs' exists in your views directory
});

// Serve the NGO registration page
router.get('/register', (req, res) => {
  res.render('ngo/register', { errorMessage: req.query.error }); // Pass error messages if any
});

// Handle NGO registration form submission
router.post('/register', ngoController.registerNgo);

// Serve the NGO login page
router.get('/login', (req, res) => {
  res.render('ngo/login', { errorMessage: req.query.error }); // Pass error messages if any
});

// Handle NGO login form submission
router.post('/login', ngoController.login);

// Handle NGO logout
router.get('/logout', ngoController.logout);

// Serve the NGO profile page
router.get('/profile', ensureAuthenticated, ngoController.getProfilePage);

// Handle NGO profile update
router.post('/profile', ensureAuthenticated, ngoController.updateProfile);

module.exports = router;
