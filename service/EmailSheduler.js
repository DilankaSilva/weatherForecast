const cron = require('node-cron');
const User = require('../models/User');
const {getWeatherData} = require('./WeatherService');
const {sendWeatherReport} = require('./EmailService');
const {generateWeatherDescription} = require('./GenerateText');



cron.schedule('0 */3 * * *',async () => {
    console.log('Sending weather report...');

    try {
        const users = await User.find();
        for (const user of users) {
            const weatherData = await getWeatherData(user.location.latitude, user.location.longitude, user.location.longitude);
            const weatherDesc = await generateWeatherDescription(weatherData);
            const  sendReport = await sendWeatherReport(user.email,weatherData,weatherDesc);
        }
        console.log('Report sent Successfully');

    }catch(err){
        console.error('Error occurred. ',err);
    }

})