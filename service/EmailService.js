const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendWeatherReport = async (email,weatherData, weatherDescription) =>{// send mail with defined transport object
    const mailOptions = {
        to: email,
        subject: "Hourly Weather Report",
        text: `Weather Report: 
               City : ${weatherData.city}
               Temperature: ${weatherData.temperature}
               Description:${weatherData.description}
               Humidity: ${weatherData.humidity}
               wind_speed: ${weatherData.wind_speed}
        
               AI generated Text : ${weatherDescription}`,
    };
    try{
        await transporter.sendMail(mailOptions);
        console.log('Successfully sent email address:', email);
    }catch(err){
        console.log('Error Sending email',err);
    }


};

module.exports = {sendWeatherReport};

