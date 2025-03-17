const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

// Load environment variables
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use('/api', apiRoutes);

require('./service/EmailSheduler')

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const port = process.env.PORT || 3033;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});