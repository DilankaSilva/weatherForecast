const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    temperature: { type: Number, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true }
    }
)

module.exports = weatherSchema