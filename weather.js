

const apiKey = '85cd50396dbde075260abbb473c28dee'; 
const searchInput = document.getElementById('input');
const searchIcon = document.querySelector('.searchbar-icon');
const cityElement = document.querySelector('.city');
const tempElement = document.querySelector('.temp');
const highLowElement = document.querySelector('.hl');
const timeElement = document.querySelector('.time');
const windElement = document.querySelector('.vent');
const humidityElement = document.querySelector('.hum');
const forecastDays = document.querySelectorAll('.day');

searchIcon.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    }
}); 
async function fetchWeatherData(city) {
    try {
    
        const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const currentData = await currentResponse.json();
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        var forecastData = await forecastResponse.json();
        console.log(currentData); console.log(forecastData); console.log(currentResponse);
        updateWeather(currentData, forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        
    }
}

function updateWeather(currentData, forecastData) {
   
    cityElement.textContent = currentData.name;
    tempElement.textContent = `${Math.round(currentData.main.temp)}°C`;
    highLowElement.textContent = `${Math.round(currentData.main.temp_max)}°/${Math.round(currentData.main.temp_min)}°`;
    windElement.textContent = `Wind: ${currentData.wind.speed} km/h`;
    humidityElement.textContent = `Humidity: ${currentData.main.humidity}%`;
    const currentTime = new Date();
    timeElement.textContent = `${WeatherCondition(currentData.weather[0].main)} ${currentTime.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`;

    forecastDays.forEach((dayElement, index) => {
        const forecastItem = forecastData.list[index * 8];
        const dayName = new Date(forecastItem.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
        dayElement.querySelector('h3').textContent = dayName;
        
        dayElement.querySelector('p').textContent = `${Math.round(forecastItem.main.temp)}°C`;
        const weatherIcon = dayElement.querySelector('img');
        weatherIcon.src = WeatherIcon(forecastItem.weather[0].main);
    });
}


function WeatherIcon(condition) {
    const icons = {
        'Clear': 'assets/icons/amcharts_weather_icons_1.0.0/animated/day.svg',
        'Clouds': 'assets/icons/amcharts_weather_icons_1.0.0/animated/cloudy-day-1.svg',
        'Rain': 'assets/icons/amcharts_weather_icons_1.0.0/animated/rainy-1.svg',
        'Thunderstorm': 'assets/icons/amcharts_weather_icons_1.0.0/animated/thunder.svg',
        'Snow': 'assets/icons/amcharts_weather_icons_1.0.0/animated/snowy-1.svg',
        'Mist': 'assets/icons/amcharts_weather_icons_1.0.0/animated/cloudy.svg'
    };
    return icons[condition] || 'assets/icons/amcharts_weather_icons_1.0.0/animated/cloudy.svg';
}
function WeatherCondition(condition) {
    const conditions = {
        'Clear': 'Sunny',
        'Clouds': 'Cloudy',
        'Rain': 'Rainy',
        'Thunderstorm': 'Stormy',
        'Snow': 'Snowy',
        'Mist': 'Misty'
    };
    return conditions[condition] || 'Weather';
}

fetchWeatherData('Meknes');

