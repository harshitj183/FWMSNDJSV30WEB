const requireAdminAuth = (req, res, next) => {
    if (req.session && req.session.admin) {
        next();  // User is authenticated
    } else {
        res.redirect('/admin/login');  // Redirect to login if not authenticated
    }
};

module.exports = { requireAdminAuth };
