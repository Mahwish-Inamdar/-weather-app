import React, { useState } from 'react';
import './App.css';

function App() {
    const [city, setCity] = useState(''); // State for the city input
    const [weatherData, setWeatherData] = useState(null); // State to hold fetched weather data
    const [forecastData, setForecastData] = useState(null); // State to hold fetched forecast data
    const [error, setError] = useState(''); // State to hold any error messages

    // Function to fetch current weather data from OpenWeather API
    const fetchWeather = async () => {
        const apiKey = 'b42ff69831ab0f55fc60cdab1ea04017'; // Replace with your actual API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url); // Fetch the data from the API
            if (!response.ok) { // Check if the response is not ok (e.g., city not found)
                throw new Error('City not found'); // Throw an error if city not found
            }
            const data = await response.json(); // Parse the JSON data
            setWeatherData(data); // Set the weather data to state
            setError(''); // Clear any previous error messages
            
            // Fetch the 5-day forecast data
            fetchForecast(data.coord.lat, data.coord.lon); // Use latitude and longitude to fetch forecast
        } catch (err) {
            setError(err.message); // Set the error message
            setWeatherData(null); // Clear weather data if there's an error
            setForecastData(null); // Clear forecast data if there's an error
        }
    };

    // Function to fetch 5-day forecast data from OpenWeather API
    const fetchForecast = async (lat, lon) => {
        const apiKey = 'b42ff69831ab0f55fc60cdab1ea04017'; // Replace with your actual API key
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url); // Fetch the forecast data from the API
            if (!response.ok) { // Check if the response is not ok
                throw new Error('Forecast data not found'); // Throw an error if not found
            }
            const data = await response.json(); // Parse the JSON data
            setForecastData(data); // Set the forecast data to state
        } catch (err) {
            setError(err.message); // Set the error message
            setForecastData(null); // Clear forecast data if there's an error
        }
    };

    // Function to handle the search when the button is clicked
    const handleSearch = () => {
        fetchWeather(); // Call the fetchWeather function
    };

    // Function to display current weather
    const displayCurrentWeather = () => {
        if (weatherData) {
            return (
                <div>
                    <h2>Current Weather in {weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                </div>
            );
        }
        return null; // Return null if no weather data is available
    };

    // Function to display the 5-day forecast
    const displayForecast = () => {
        if (forecastData) {
            return (
                <div>
                    <h2>5-Day Forecast</h2>
                    <div className="forecast-container">
                        {forecastData.list.map((forecast, index) => (
                            <div key={index} className="forecast-item">
                                <p>Date: {new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                                <p>Temperature: {forecast.main.temp}°C</p>
                                <p>Weather: {forecast.weather[0].description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return null; // Return null if no forecast data is available
    };

    return (
        <div className="App">
            <header className="App-header">
                
            <h1>Discover Your Local Weather Now!</h1>
<p>Type your city to get instant weather updates and forecasts.</p>


                <div className="search-container">
                    <input
                        type="text"
                        id="city-input"
                        placeholder="Enter city name"
                        className="city-input"
                        value={city} // Bind input value to state
                        onChange={(e) => setCity(e.target.value)} // Update city state on input change
                    />
                    <button
                        id="search-button"
                        onClick={handleSearch}
                        className="search-button"
                    >
                        🔍
                    </button>
                </div>
                {error && <p className="error-message">{error}</p>} {/* Display error message if exists */}
                {displayCurrentWeather()} {/* Call function to display current weather */}
                {displayForecast()} {/* Call function to display forecast */}
                <div id="weather-info"></div>
            </header>
        </div>
    );
}

export default App;
