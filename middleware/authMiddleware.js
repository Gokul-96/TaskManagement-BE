const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'your-secret-key');
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  req.userId = decodedToken.userId;
  next();
};

module.exports = isAuth;