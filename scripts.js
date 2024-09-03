// Function to fetch and display weather data
function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '2828dd1060c7721b0e61b2e2b5a0a7b9'; // Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap

    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                document.getElementById('weatherResult').innerHTML = 'City not found. Please try again.';
                return;
            }

            const weatherDescription = data.weather[0].description;
            const temperatureCelsius = data.main.temp;
            const temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;
            const humidity = data.main.humidity;
            const windSpeedMps = data.wind.speed;
            const windSpeedMph = windSpeedMps * 2.237;

            document.getElementById('weatherResult').innerHTML = `
                <h2>Weather in ${data.name}</h2>
                <p>Description: ${weatherDescription}</p>
                <p>Temperature: ${temperatureCelsius}°C / ${temperatureFahrenheit.toFixed(2)}°F</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeedMps} m/s / ${windSpeedMph.toFixed(2)} mph</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherResult').innerHTML = 'Error fetching weather data. Please try again later.';
        });
}

// Event listener for the button click
document.getElementById('getWeather').addEventListener('click', getWeather);

// Event listener for the Enter key press
document.getElementById('city').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

