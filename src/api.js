import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'e9391e1ce68c9e71ee8fc43b93ea9697';

export const fetchWeather = async (city = 'Lagos') => {
    try {
        const response = await axios.get(`${baseUrl}weather?q=${city}&units=metric&appid=${apiKey}`);
        return response.data;
    } catch (error) {
        return error;
    }
}