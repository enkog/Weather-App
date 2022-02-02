import _ from 'lodash';
import $ from 'jquery';
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
        $('.current-temp').html(`<p class="no-data">No data found for this city !!!</p>`);
        $('.min-max').html(`<p class="no-data">No data found for this city !!!</p>`);
        $('.temp-metrics').addClass('hidden');
    }
}

const displayWeather = (data) => {
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {country} = data.sys;
    const {humidity, temp, pressure, temp_min, temp_max} = data.main;
    const {speed} = data.wind;

    $(".city").text(`${name}, `);
    $(".country").text(country);
    $('.main-temp').text(`${temp}°C`);
    $('.weather-icon').attr("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
    $('.humidity').text(`${humidity}%`);
    $('.wind').text(`${speed} km/h`);
    $('.description').text(description);
    $('.pressure').text(`${pressure} hPa`);

    $(".search-btn2").on("click", (e) => {
        e.preventDefault();
        const country = $(".search-weather2").val();
        fetchWeather(country);
        $('.coldest-weather').text(temp_min);
        $('.warmest-weather').text(temp_max);
        $('.current-temp').addClass('hidden');
        $('.temp-metrics').addClass('hidden');
        $('.min-max').removeClass('hidden');
    });
}

$(".search-btn1").on("click", (e) => {
    e.preventDefault();
    const country = $(".search-weather1").val();
    fetchWeather(country); 
});

$('#date-time').text(DateTime.now().toLocaleString(DateTime.DATETIME_MED).toString());

$(window).on('load', (e) => {
    e.preventDefault();
    fetchWeather();
});
