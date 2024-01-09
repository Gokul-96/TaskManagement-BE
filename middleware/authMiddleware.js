const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const verifyToken = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const token = authHeader.slice(7);

  try {
    const decodedToken = jwt.verify(token, config.SECRET_KEY, { algorithms: ['HS256'] });
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error('Token Verification Error:', error.message);
    console.error('Provided Token:', token);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Permission denied' });
  }
};

module.exports = { verifyToken, isAdmin };