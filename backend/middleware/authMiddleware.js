import jwt from 'jsonwebtoken';

export const protect = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) return res.status(401).json({ message: 'Not authorized' });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: You do not have access' });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};
