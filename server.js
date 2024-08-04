const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import Routes
const donorRoutes = require('./routes/donor');
const adminRoutes = require('./routes/admin');
const ngoRoutes = require('./routes/ngo');

// Use routes
app.use('/donor', donorRoutes);
app.use('/admin', adminRoutes);
 app.use('/ngo', ngoRoutes);
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

// Contact Routes
const contactRoutes = require('./routes/contact');  // Check this path
app.use('/', contactRoutes);

//about Routs
const aboutRoutes = require('./routes/about');  // Check this path
app.use('/', aboutRoutes);
 
// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
