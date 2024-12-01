const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ username, email, password });
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});



//update user
router.put('/profile', protect, async (req, res) => {
    console.log('Request received:', req.body); // Log request body
    console.log('Authenticated user:', req.user); // Log authenticated user
    try {
        const userId = req.user.id;
        const { username, email, mobile_number, monthlyBudget } = req.body;


        const user = await User.findByIdAndUpdate(
            userId,
            { username, email, mobile_number, monthlyBudget },
            { new: true, runValidators: true }
        ).select('-password');

    

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating profile:', error); // Log detailed error
        res.status(500).json({ message: 'Error updating user profile', error });
    }
});

// Get user profile
router.get('/profile', protect, async (req, res) => {
    try {
        // Get the authenticated user ID from the token (via the protect middleware)
        const userId = req.user.id;

        // Find the user by their ID and return the profile (excluding password)
        const user = await User.findById(userId).select('-password');

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user profile data
        res.status(200).json(user);
    } catch (error) {
        console.error('Error retrieving profile:', error); // Log error for debugging
        res.status(500).json({ message: 'Error retrieving user profile', error });
    }
});

module.exports = router;


