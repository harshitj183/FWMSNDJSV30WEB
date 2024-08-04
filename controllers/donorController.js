// controllers/donorController.js
const donorModel = require('../models/donorModel');

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/donor/dashboard'); // Redirect on error
    }
    res.redirect('/donor/login'); // Redirect on success
  });
};

exports.login = (req, res) => {
  // Implementation for login logic
  res.send('Login successful');
};

exports.getRegisterPage = (req, res) => {
  res.render('donor/register'); // Path to EJS file
};

exports.registerDonor = (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  // Save donor details
  donorModel.createDonor({ name, email, password }, (err) => {
    if (err) {
      return res.status(500).send('Error saving donor details');
    }
    res.redirect('/donor/dashboard'); // Redirect after registration
  });
};
