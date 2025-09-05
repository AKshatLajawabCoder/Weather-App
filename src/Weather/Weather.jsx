import { useState } from 'react'
import './Weather.css'

export default function Weather() {

    const API_KEY = "d720bb20741d733bbe5b14ecbc92466a"
    const [city, setCity] = useState('')
    const [loading, setLoading] = useState(false)
    const [weather, setWeather] = useState(null)

    async function getWeather() {
        setLoading(true)
        if (!city) {
            setLoading(false)
            alert("Please enter a City!")
            return
        }
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        const data = await response.json()
        if (data.cod != 200) {
            alert('Please enter a valid City!')
            setCity('')
            setLoading(false)
            return
        } else {
            setWeather(data)
            console.log(data)
            setLoading(false)
        }
    }



    return (
        <div className="container">
            <h1>Weather App</h1>
            <div className="inp">
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            getWeather()
                        }
                    }}
                    placeholder="Enter City..." />
                <button onClick={() => getWeather()} >Get Weather</button>
            </div>
            {loading && (<h2 className='weather-data' >Loading...</h2>)}
            {weather && (
                <div className='weather-data'>
                    <div className='weather-card'>
                        <h3>City</h3>
                        <p>{weather.name}</p>
                    </div>
                    <div className='weather-card'>
                        <h3>Temperature</h3>
                        <p>{weather.main.temp}°C</p>
                    </div>
                    <div className='weather-card'>
                        <h3>Pressure</h3>
                        <p>{weather.main.pressure} hPa</p>
                    </div>
                    <div className='weather-card'>
                        <h3>Humidity</h3>
                        <p>{weather.main.humidity}%</p>
                    </div>
                </div>

            )}

        </div>
    )
}