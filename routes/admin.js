const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin login route
router.get('/login', (req, res) => {
    res.render('admin/login');
});

router.post('/login', adminController.login);

// Admin dashboard route
router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard');
});

module.exports = router;
