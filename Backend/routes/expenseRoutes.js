const express = require('express');
const Expense = require('../models/Expense');
const { protect } = require('../middleware/authMiddleware'); // Assuming the user is authenticated
const router = express.Router();

// Add a new expense (protected route)
router.post('/add', protect, async (req, res) => {
    try {
        const { name, amount, date, category } = req.body;
        const userId = req.user.id;  // Get the authenticated user's ID from req.user

        const expense = new Expense({
            name,
            amount,
            date,
            category,
            user: userId,  // Attach the authenticated user to the expense
        });

        await expense.save();
        res.status(201).json({ message: 'Expense added successfully', expense });
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error });
    }
});

// Get all expenses for the authenticated user (protected route)
router.get('/', protect, async (req, res) => {
    try {
        const userId = req.user.id;  // Get the authenticated user's ID from req.user
        const expenses = await Expense.find({ user: userId });  // Fetch expenses that belong to the user
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error });
    }
});

// Clear all expenses for the authenticated user (protected route)
router.delete('/clear', protect, async (req, res) => {
    try {
        const userId = req.user.id;  // Get the authenticated user's ID from req.user
        await Expense.deleteMany({ user: userId });  // Delete only the authenticated user's expenses
        res.status(200).json({ message: 'All expenses cleared' });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing expenses', error });
    }
});

module.exports = router;
