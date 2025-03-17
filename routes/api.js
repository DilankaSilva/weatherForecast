const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const weatherController = require('../controllers/weatherController');

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/users', asyncHandler(userController.createUser));
router.put('/users/:email/location', asyncHandler(userController.updateUserLocation));
router.get('/users/:email/weather', asyncHandler(weatherController.getWeatherData));
router.get('/users/weather/:email', asyncHandler(weatherController.getWeatherByDate));

module.exports = router;