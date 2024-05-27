const ensureAuthenticated = (req, res, next) => {
    if (req.session.user) {
      return next();
    }
    res.flash("danger", "Please log in to view that resource");
    res.redirect("/login");
  };
  
  const ensureAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
      return next();
    }
    res.sendStatus(403);
  };
  
  module.exports = { ensureAuthenticated, ensureAdmin };
  