const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Validate input data, check if the user already exists, and create the user
    // For demonstration purposes, this example assumes password hashing and other security measures are already implemented.
    const newUser = await User.create({ username, password });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to log in a user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Validate input data, check if the user exists, and perform authentication
    // For demonstration purposes, this example assumes password comparison and token generation are already implemented.
    const user = await User.findOne({ username });
    if (!user || !user.isPasswordValid(password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = user.generateAuthToken();
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to get user details
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to update user details
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to delete a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
