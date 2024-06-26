import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../entities/User';

dotenv.config();

const userRepository = AppDataSource.getRepository(User);

export const signup = async (req: Request, res: Response) => {
  const { userType, name, email, password, phoneNumber } = req.body;

  try {
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.userType = userType;
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.phoneNumber = phoneNumber;

    await userRepository.save(user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  console.log("LOGIN");

  const { email, password } = req.body;

  try {
    const user = await userRepository.findOneBy({ email });
    console.log({ user })
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
    });

    res.json({
      token, user: {
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        userType: user.userType
      }
    });
  } catch (error) {

    res.status(500).json({ message: 'Server error' });
  }
};
