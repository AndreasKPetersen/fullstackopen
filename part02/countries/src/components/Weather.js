import { useState, useEffect } from 'react';
import axios from 'axios'

const Weather = ( {capital} ) => {
    
    const [weather, setWeather] = useState([])
    const OPENWEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${OPENWEATHER_API_KEY}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [])

    if (weather.length === 0) 
        return null

    return (
        <div>
            <h1>Weather in {capital}</h1>
            <p>temperature {weather.main.temp} Celsius</p>

            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}></img>
            
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather