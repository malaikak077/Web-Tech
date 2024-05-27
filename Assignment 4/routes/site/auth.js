const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../../Models/User");

const router = express.Router();

const JWT_SECRET = 'jwt_secret_key';

// Register route
router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.flash("danger", "User Already Exist");
    return res.redirect("/register");
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const role = req.body.email === 'admin@gmail.com' ? 'admin' : 'user';

  user = new User({ ...req.body, password: hashedPassword, role });
  await user.save();
  res.redirect("/login");
});

// Logout route
router.get("/logout", (req, res) => {
  req.session.user = null;
  res.clearCookie("token");
  res.flash("success", "Logged out Successfully");
  res.redirect("/login");
});

// Login route
router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.flash("danger", "User with given email doesn't exist");
    return res.redirect("/register");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    res.flash("danger", "Invalid Password");
    return res.redirect("/login");
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.cookie("token", token, { httpOnly: true });

  //creating session
  req.session.user = { id: user._id, email: user.email, role: user.role };
  if (user.email === 'admin@gmail.com') {
    return res.redirect("/dashboard");
  }
  return res.redirect("/index.html");
});

module.exports = router;
