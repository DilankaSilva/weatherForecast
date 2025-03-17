const mongoose = require('mongoose');
const weatherSchema = require('./Weather');

const userSchema = new mongoose.Schema({
    email: {type:String, required:true, unique:true},
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    CreatedTime: {type:Date,default:Date.now},
    weatherData: weatherSchema,
    lastUpdated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema);