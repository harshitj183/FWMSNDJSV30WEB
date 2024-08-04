const ngoModel = require('../models/ngoModel');

// Middleware to check if the user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.session && req.session.ngoId) {
    return next();
  }
  res.redirect('/ngo/login'); // Redirect to login if not authenticated
};

// Serve the NGO registration page
exports.getRegisterPage = (req, res) => {
  res.render('ngo/register'); // Path to the NGO registration EJS file
};

// Handle NGO registration form submission
exports.registerNgo = (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  // Save NGO details
  ngoModel.createNgo({ name, email, password }, (err) => {
    if (err) {
      console.error('Error saving NGO details:', err);
      return res.status(500).send('Error saving NGO details');
    }
    res.redirect('/ngo/dashboard'); // Redirect after registration
  });
};

// Serve the NGO login page
exports.getLoginPage = (req, res) => {
  res.render('ngo/login'); // Path to the NGO login EJS file
};

// Handle NGO login form submission
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  // Implement login logic
  ngoModel.findNgoByEmail(email, (err, ngo) => {
    if (err) {
      console.error('Error finding NGO:', err);
      return res.status(500).send('Error logging in');
    }
    if (!ngo || ngo.password !== password) {
      return res.status(401).send('Invalid email or password');
    }

    // Set session
    req.session.ngoId = ngo.id;

    res.redirect('/ngo/dashboard'); // Redirect to dashboard on successful login
  });
};

// Handle NGO logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.redirect('/ngo/dashboard'); // Redirect on error
    }
    res.redirect('/ngo/login'); // Redirect to login on successful logout
  });
};

// Serve the NGO profile page
exports.getProfilePage = (req, res) => {
  const ngoId = req.session.ngoId;

  if (!ngoId) {
    return res.redirect('/ngo/login'); // Redirect to login if not authenticated
  }

  ngoModel.getNgoById(ngoId, (err, ngo) => {
    if (err) {
      console.error('Error retrieving NGO profile:', err);
      return res.status(500).send('Error retrieving NGO profile');
    }
    if (!ngo) {
      return res.status(404).send('NGO not found');
    }
    res.render('ngo/profile', { ngo }); // Render the profile page with NGO data
  });
};

// Handle NGO profile update
exports.updateProfile = (req, res) => {
  const ngoId = req.session.ngoId;
  const { name, email, address } = req.body;

  if (!ngoId || !name || !email || !address) {
    return res.status(400).send('All fields are required');
  }

  ngoModel.updateNgo(ngoId, { name, email, address }, (err) => {
    if (err) {
      console.error('Error updating NGO profile:', err);
      return res.status(500).send('Error updating NGO profile');
    }
    res.redirect('/ngo/profile'); // Redirect to profile page after updating
  });
};

// Export the middleware
exports.ensureAuthenticated = ensureAuthenticated;
