import _ from 'lodash';
import $ from 'jquery';
import { DateTime } from './luxon.js';
import { fetchWeather } from './api.js';
import './style.css';


const displayWeather = (data) => {
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {country} = data.sys;
    const {humidity, temp, pressure} = data.main;
    const {speed} = data.wind;

    $(".city").text(`${name}, `);
    $(".country").text(country);
    $('.main-temp').text(`${temp}°C`);
    $('.weather-icon').attr("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
    $('.humidity').text(`${humidity}%`);
    $('.wind').text(`${speed} km/h`);
    $('.description').text(description);
    $('.pressure').text(`${pressure} hPa`);
}

const getWeather = async (city) => {
    try {
      const response = await fetchWeather(city);
      displayWeather(response);
    } catch (error) {
      console.log('No data found for this city');
    }
  };

$(".search-btn1").on("click", (e) => {
    e.preventDefault();
    const term = $(".search-weather1").val();
    $('.search-weather1').val("");
    getWeather(term); 
});

$(".search-btn2").on("click", async (e) => {
    e.preventDefault();
    const term = $(".search-weather2").val();
    $('.search-weather2').val("");
    const data = await fetchWeather(term);
    const {temp_min, temp_max, temp} = data.main;
    const {name} = data;

    $('.country-temp').removeClass('hidden');
    $('.city-temp').text(`${name}, ${temp}°C`);
    $('.current-temp').addClass('hidden');
    $('.temp-metrics').addClass('hidden');
    $('.coldest-weather').html(`<h2 class="cw-header">Coldest Temperature</h2> <p class="cw-p">${temp_min}</p>`);
    $('.warmest-weather').html(`<h2 class="cw-header">Warmest Temperature</h2> <p class="cw-p">${temp_max}</p>`);
});

$('#date-time').text(DateTime.now().toLocaleString(DateTime.DATETIME_MED).toString());

$(window).on('load', (e) => {
    e.preventDefault();
    getWeather();
});
