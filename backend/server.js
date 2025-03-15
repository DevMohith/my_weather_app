require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const API_KEY = "your_openweather_api_key";

// below is api call to get updates from openweather app 

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: "City name is required" });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        res.json({
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            humidity: response.data.main.humidity
        });
    } catch (error) {
        res.status(404).json({ error: "City not found" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
