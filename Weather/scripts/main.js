const apiKey = 'b4cc4ab1a0126e4133d718444deff022'; // Use your OpenWeatherMap API key here

const getWeatherButton = document.getElementById('getWeather');
const weatherDisplay = document.getElementById('weatherDisplay');

// Event listener for the "Get Weather" button

getWeatherButton.addEventListener('click', () => {
    if(document.getElementById('cityInput') != null){

    const city = document.getElementById('cityInput').value.trim();
    if (city === "") {
        weatherDisplay.innerHTML = "<p>Please enter a city name!</p>";
    } else {
        fetchWeatherData(city);
    }
}
});

// Function to fetch weather data from OpenWeatherMap API
function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch data from the OpenWeatherMap API
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            weatherDisplay.innerHTML = `<p>${error.message}</p>`;
        });
}

// Function to display the fetched weather data
function displayWeather(data) {
    const { main, wind, weather } = data;

    // Display weather details
    weatherDisplay.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
        <p><strong>Condition:</strong> ${weather[0].description}</p>
    `;
}