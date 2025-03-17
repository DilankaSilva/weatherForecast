const axios = require('axios');

const getWeatherData = async (lat, lon) => {

    const API_KEY = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    try{
        const response = await axios.get(url);
        return{
            temperature: response.data.main.temp,
            description:response.data.weather[0].description,
            humidity: response.data.main.humidity,
            wind_speed: response.data.wind.speed,
            city: response.data.name
        }
    }catch (err){
        console.log("Fetching the data can ot be done: ",err);
    }

}

// const getWeatherDataByDate = async (lat, lon, cnt) => {
//     const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${API_KEY}&units=metric`;
//
//     try {
//         const response = await axios.get(url);
//         return response.data.list;
//     } catch (error) {
//         console.error("Error fetching forecast data:", error.message);
//         throw new Error("Failed to fetch forecast data");
//     }
// };

module.exports = { getWeatherData };