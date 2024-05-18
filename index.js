const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;
const WEATHER_API_KEY = '2cfceee9afb18d9d83b813495b5afc57'; // Replace with your Weather API key

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/execute', (req, res) => {
    const zipCode = req.body.inArguments[0].zipCode;

    if (!zipCode) {
        return res.status(400).send({ error: 'ZIP code is required' });
    }

    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${WEATHER_API_KEY}&units=imperial`;

    request(weatherUrl, (error, response, body) => {
        if (error) {
            return res.status(500).send({ error: 'Failed to fetch weather data' });
        }

        const weatherData = JSON.parse(body);
        const temperature = weatherData.main.temp;

        return res.status(200).send({ temperature });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
