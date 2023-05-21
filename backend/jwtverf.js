import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).send({
      message: 'Token required for authentication.',
    });
  }
  try {
    req.user = jwt.verify(token, process.env.TOKEN_KEY);
  } catch (error) {
    return res.status(401).send('Invalid token.');
  }
  return next();
};

export default verifyToken;
