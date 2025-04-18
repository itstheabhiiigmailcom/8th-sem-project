import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const verifyJWT = async (req, res, next) => {
  try {
    // Use cookie or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.headers?.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized request' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decodedToken?.id).select(
      '-password -refreshToken'
    );
    // console.log('Bhej diya yahan se');

    if (!user) {
      return res.status(401).json({ message: 'Invalid Access Token' });
    }

    req.user = user;
    res.status(200).json({ user });
    next(); // ✅ only call next
  } catch (error) {
    return res.status(401).json({
      message: error?.message || 'Invalid access token or something went wrong',
    });
  }
};
