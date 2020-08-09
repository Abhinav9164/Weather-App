import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'aa0c92fe00986213c0ab8a1c5c27f130';

export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    });

    return data;
}