const jwt = require('jsonwebtoken');
const JWT_SECRET = 'jwt_secret_key';

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Access Denied: Invalid Token' });
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.sendStatus(403);
  }
  next();
};

module.exports = { authenticateJWT, isAdmin };


