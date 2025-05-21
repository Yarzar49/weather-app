import React, { useState, useEffect } from 'react'

const API_KEY = '55c5ab94d485ff84542fe9a02f59067d';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    const [forecast, setForecast] = useState([]);


    useEffect(() => {
        setCity('Nay Pyi Taw');
        fetchWeather('Nay Pyi Taw'); // Use city name directly
    }, []);      
      
    const fetchWeather = async (cityName) => {
        if (!cityName) return;
        setLoading(true);
        setError('');
        try {
            // Current Weather
            const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
            );
            if (!res.ok) throw new Error('City not found');
            const data = await res.json();
            setWeather(data);

            // 5-Day Forecast
            const forecastRes = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
            );
            const forecastData = await forecastRes.json();
        
            // Filter only 12:00:00 entries
            const dailyForecast = forecastData.list.filter(item =>
                item.dt_txt.includes('12:00:00')
            );
        
      setForecast(dailyForecast);
        } catch (err) {
            setError(err.message);
            setWeather(null);
            setForecast([]);
        } finally {
            setLoading(false);
        }
    };
      
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') fetchWeather(city);
    };  
    
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>🌤 Weather App</h2>
        <input 
            type="text" 
            placeholder='Enter city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
        />
        <button onClick={() => fetchWeather(city)}>
            Search
        </button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {weather && (
            <div style={{ marginTop: '1rem' }}>
                <h3>{weather.name}, {weather.sys.country}</h3>  
                <p>{weather.weather[0].main} ({weather.weather[0].description})</p>       
                <p>🌡 {weather.main.temp} °C</p>
                <p>💧 Humidity: {weather.main.humidity}%</p>     
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="weather-icon"
                />  
            </div>
        )}
        {forecast.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
                <h4>5-Day Forecast</h4>
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                {forecast.map((item, index) => (
                    <div
                    key={index}
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '1rem',
                        width: '120px',
                        textAlign: 'center'
                    }}
                    >
                    <p style={{ fontWeight: 'bold' }}>
                        {new Date(item.dt_txt).toLocaleDateString(undefined, {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                        })}
                    </p>
                    <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt="icon"
                    />
                    <p>{item.main.temp} °C</p>
                    <p style={{ fontSize: '0.85em' }}>{item.weather[0].main}</p>
                    </div>
                ))}
                </div>
            </div>
        )}
    </div>
  )
}

export default WeatherApp