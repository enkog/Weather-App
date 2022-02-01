import _ from 'lodash';
import { DateTime } from './luxon.js';
import axios from 'axios';
import './style.css';

const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'e9391e1ce68c9e71ee8fc43b93ea9697';

const fetchWeather = async (city = 'Lagos') => {
    try {
        const response = await axios.get(`${baseUrl}weather?q=${city}&units=metric&appid=${apiKey}`);
        console.log(response.data);
    } catch (error) {
        document.querySelector('.current-temp').innerHTML = `<p class="no-data">No data found for this city !!!</p>`;
        document.querySelector('.temp-metrics').classList.add('hidden');
    }  
}

document.getElementById('date-time').textContent = DateTime.now().toLocaleString(DateTime.DATETIME_MED).toString();