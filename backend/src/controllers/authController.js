const { User } = require('../models');
const jsonwebtoken = require('jsonwebtoken')

// POST /auth/signup
const signup = async (req, res, next) => {
    try {
        const { uid, email, role } = req.body; // In real app, uid comes from decoded firebase token
        
        // We assume frontend already created the user in Firebase Auth.
        // We sync it here. Alternatively, we extract uid from req.user if requireAuth is used.
        // But signup is often public, so we accept uid/email, or better: verify token first.
        
        const existingUser = await User.findByPk(uid);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = await User.create({
            id: uid,
            email,
            role: role || 'user'
        });

       

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        next(error);
    }
};

// POST /auth/login
const login = async (req, res, next) => {
    try {
        // Firebase handles the actual login. 
        // This endpoint could just verify token and return user details.
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        const user = await User.findByPk(req.user.uid);
        if (!user) {
            return res.status(404).json({ error: 'User not found in local DB' });
        }

        res.json({ message: 'Login successful', user });
    } catch (error) {
        next(error);
    }
};

// GET /auth/profile
const getProfile = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.uid);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = { signup, login, getProfile };
