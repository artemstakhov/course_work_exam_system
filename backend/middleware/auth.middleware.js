import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Токен відсутній. Необхідна авторизація' });
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Недійсний або протермінований токен' });
  }
};
