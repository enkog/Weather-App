import _ from 'lodash';
import { DateTime } from './luxon.js';
import './style.css';
import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'e9391e1ce68c9e71ee8fc43b93ea9697';

const fetchWeather = async (city = 'Lagos') => {
    try {
        const response = await axios.get(`${baseUrl}weather?q=${city}&units=metric&appid=${apiKey}`);
        displayWeather(response.data);
    } catch (error) {
        document.querySelector('.current-temp').innerHTML = 
        `
        <p class="no-data">No data found for this city !!!</p>
        `;
        document.querySelector('.temp-metrics').classList.add('hidden');
    }  
}

const displayWeather = (data) => {
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {country} = data.sys;
    const {humidity, temp, pressure} = data.main;
    const {speed} = data.wind;

    document.querySelector('.city').textContent = `${name}, `;
    document.querySelector('.country').textContent = country;
    document.querySelector('.main-temp').textContent = `${temp}°C`;
    document.querySelector('.weather-icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.querySelector('.humidity').textContent = `${humidity}%`;
    document.querySelector('.wind').textContent = `${speed} km/h`;
    document.querySelector('.description').textContent = description;
    document.querySelector('.pressure').textContent = `${pressure} hPa`;
  }

document.getElementById('date-time').textContent = DateTime.now().toLocaleString(DateTime.DATETIME_MED).toString();