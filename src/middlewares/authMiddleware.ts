import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthRequest extends Request {
  userId?: number;
  userType?: string;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number; userType: string };
    req.userId = decoded.userId;
    req.userType = decoded.userType;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const checkTeacher = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.userType !== 'teacher') {
    return res.status(403).json({ message: 'Unauthorized user type' });
  }
  next();
};

export const checkStudent = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.userType !== 'student') {
      return res.status(403).json({ message: 'Unauthorized user type' });
    }
    next();
  };
