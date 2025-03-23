import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, badgeNumber, adminId, password, role } = req.body;

    if (role === 'anonymous') {
      return res.status(400).json({ message: 'Anonymous users do not need to register.' });
    }

    let newUser;

    if (role === 'police') {
      if (!name || !badgeNumber) {
        return res.status(400).json({ message: 'Police must provide name and badge number.' });
      }
      newUser = new User({ name, badgeNumber, role });
    } 
    
    else if (role === 'citizen') {
      if (!phone || !name) {
        return res.status(400).json({ message: 'Citizen must provide name and phone number.' });
      }
      newUser = new User({ name, email, phone, role });
    } 
    
    else if (role === 'admin') {
      if (!adminId || !password) {
        return res.status(400).json({ message: 'Admin must provide admin ID and password.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      newUser = new User({ adminId, password: hashedPassword, role });
    }

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};
