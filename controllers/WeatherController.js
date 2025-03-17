const User = require('../models/User');
const { getWeatherData, getWeatherDataByDate } = require('../service/WeatherService');

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

//
// exports.getWeatherByDate = async (req, res) => {
//     try {
//         const { email } = req.params;
//         const { date } = req.query;
//
//         console.log("Email:", email);
//         console.log("Date:", date);
//
//         if (!email || !date) {
//             return res.status(400).json({ error: "Missing required parameters: email, date" });
//         }
//
//         const user = await User.findOne({ email });
//         console.log("User:", user);
//
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//
//         const cnt = 7;
//         const forecastData = await getWeatherDataByDate(user.location.latitude, user.location.longitude, cnt);
//         console.log("Forecast Data:", forecastData);
//
//         const targetTimestamp = new Date(date).setUTCHours(0, 0, 0, 0) / 1000;
//         console.log("Target Timestamp:", targetTimestamp);
//
//         const forecast = forecastData.find(day => {
//             const forecastTimestamp = new Date(day.dt * 1000).setUTCHours(0, 0, 0, 0) / 1000;
//             return forecastTimestamp === targetTimestamp;
//         });
//
//         if (!forecast) {
//             return res.status(404).json({ error: "Weather data not available for the given date" });
//         }
//
//         res.json({
//             date,
//             temperature: forecast.temp.day,
//             weather: forecast.weather[0].description,
//             humidity: forecast.humidity,
//             wind_speed: forecast.speed,
//         });
//     } catch (error) {
//         console.error("Error fetching forecast data:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };