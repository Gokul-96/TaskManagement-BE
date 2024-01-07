const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  console.log('Request Headers:', req.headers); 
  const authHeader = req.get('Authorization');
  console.log('Auth Header:', authHeader);
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  let token;
  
  // Check if the token is provided with the Bearer prefix
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else {
    // If not, assume the token is directly provided
    token = authHeader;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'SECRET_KEY');
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  req.userId = decodedToken.userId;
  next();
};

module.exports = {
  verifyToken: verifyToken,
};