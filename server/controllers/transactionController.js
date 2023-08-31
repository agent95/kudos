const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Route to transfer money
router.post('/transfer', async (req, res) => {
  try {
    const { senderId, receiverId, amount } = req.body;
    // Validate input data, check if the sender and receiver exist, and perform the money transfer
    // For demonstration purposes, this example assumes sufficient balance check and money transfer logic are already implemented.
    // Update sender's and receiver's balances accordingly.
    // Create a new transaction record in the database.
    const newTransaction = await Transaction.create({ sender: senderId, receiver: receiverId, amount });
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to get transaction history for a user
router.get('/history/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find all transactions where the user is the sender or receiver
    const transactions = await Transaction.find({ $or: [{ sender: userId }, { receiver: userId }] });
    res.json(transactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
