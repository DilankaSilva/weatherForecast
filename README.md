# Weather API

A simple weather application that fetches current weather data and forecast data for a given location. It provides an API to get current weather based on user location and forecast weather data for a specific date.

## Features
- Fetch current weather for a user location.
- Retrieve weather forecast for a given date.

## Technologies Used
- Node.js
- Express.js
- Axios (for making API calls)
- MongoDB (for storing user data)
- OpenWeatherMap API for weather data
- OpenAI FOR generate description
- NodeMailer for send mail 


#### API Endpoints:
`GET /api/weather/:email`
`PUT api/users/:email/location`
`POST api/users`


#### Request:
- **URL Parameters:**
  - `email`: User's email address (used to find the user's location from the database).

#### Response:
- **200 OK**: Returns current weather data for the user.
- **404 Not Found**: If the user is not found in the database.

