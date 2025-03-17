const User = require('../models/User');

// Create a new user
const createUser = async (req, res) => {
    const { email, latitude, longitude } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const user = new User({ email, location: { latitude, longitude } });
        await user.save();

        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(400).json({ message: 'Error creating user', error: err.message });
    }
};

// Update user location
const updateUserLocation = async (req, res) => {
    const { latitude, longitude } = req.body;
    const { email } = req.params;

    try {
        // Find the user by email and update their location
        const user = await User.findOneAndUpdate(
            { email }, // Filter by email
            { location: { latitude, longitude } }, // Update location
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Location updated successfully', user });
    } catch (err) {
        console.error('Error updating location:', err);
        res.status(500).json({ message: 'Error updating location', error: err.message });
    }
};

module.exports = { createUser, updateUserLocation };