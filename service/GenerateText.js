// const { OpenAI } = require('openai');
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// const generateWeatherDescription = async (weatherData) => {
//     const prompt = `Write a short weather report for ${weatherData.city} with a temperature of ${weatherData.temperature}°C and ${weatherData.description}.`;
//
//     try {
//         const response = await openai.completions.create({
//             model: 'gpt-3.5-turbo-instruct',
//             prompt: prompt,
//             temperature: 0.7,
//             max_tokens: 100,
//         });
//
//         return response.choices[0].text.trim();
//     } catch (error) {
//         console.error('Error generating weather description:', error);
//         return 'Unable to generate weather description.';
//     }
//
//
// };

const { pipeline } = require('jstransformer');

// Function to generate weather description using GPT-2
const generateWeatherDescription = async (weatherData) => {
    const prompt = `Write a short weather report for ${weatherData.city} with a temperature of ${weatherData.temperature}°C and ${weatherData.description}.`;

    try {
        const generator = pipeline('text-generation', 'gpt2');

        const response = await generator(prompt, {
            max_length: 100,
            num_return_sequences: 1,
            temperature: 0.7,
        });

        return response[0].generated_text.trim();
    } catch (error) {
        console.error('Error generating weather description:', error);

        return `The weather in ${weatherData.city} is ${weatherData.description} with a temperature of ${weatherData.temperature}°C.`;
    }
};

module.exports = { generateWeatherDescription };
