const User = require('../models/User');
const { getWeatherData, getWeatherDatadate} = require('../service/WeatherService');

exports.getWeatherData = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const weatherData = await getWeatherData(user.location.latitude, user.location.longitude);

        res.status(200).json({ weatherData });
    } catch (error) {
        console.error('Error fetching current weather data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getWeatherByDate = async (req, res) => {
    try {
        const { email } = req.params;
        const { date } = req.query;


        if (!email || !date) {
            return res.status(400).json({ error: "Missing required parameters: email, date" });
        }

        const user = await User.findOne({ email });
        console.log("User:", user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        const targetDate = new Date(date).setUTCHours(0, 0, 0, 0) / 1000;
        console.log(targetDate)
        const weatherData = await getWeatherDatadate(user.location.latitude,user.location.longitude,targetDate);
        res.status(200).json({ weatherData });


    } catch (error) {
        console.error("Error fetching forecast data:", error);
        res.status(500).json({ message: "Server error" });
    }
};