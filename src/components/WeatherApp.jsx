// import React, { useState, useEffect } from 'react'

// const API_KEY = '55c5ab94d485ff84542fe9a02f59067d';

// const WeatherApp = () => {
//     const [city, setCity] = useState('');
//     const [weather, setWeather] = useState(null);
//     const [loading, setLoading] = useState('');
//     const [error, setError] = useState('');
//     const [forecast, setForecast] = useState([]);


//     useEffect(() => {
//         setCity('Nay Pyi Taw');
//         fetchWeather('Nay Pyi Taw'); // Use city name directly
//     }, []);      
      
//     const fetchWeather = async (cityName) => {
//         if (!cityName) return;
//         setLoading(true);
//         setError('');
//         try {
//             // Current Weather
//             const res = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
//             );
//             if (!res.ok) throw new Error('City not found');
//             const data = await res.json();
//             setWeather(data);

//             // 5-Day Forecast
//             const forecastRes = await fetch(
//                 `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
//             );
//             const forecastData = await forecastRes.json();
        
//             // Filter only 12:00:00 entries
//             const dailyForecast = forecastData.list.filter(item =>
//                 item.dt_txt.includes('12:00:00')
//             );
        
//       setForecast(dailyForecast);
//         } catch (err) {
//             setError(err.message);
//             setWeather(null);
//             setForecast([]);
//         } finally {
//             setLoading(false);
//         }
//     };
      
    
//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter') fetchWeather(city);
//     };  
    
//   return (
//     <div style={{ textAlign: 'center', marginTop: '2rem' }}>
//         <h2>🌤 Weather App</h2>
//         <input 
//             type="text" 
//             placeholder='Enter city'
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             onKeyDown={handleKeyDown}
//         />
//         <button onClick={() => fetchWeather(city)}>
//             Search
//         </button>
//         {loading && <p>Loading...</p>}
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         {weather && (
//             <div style={{ marginTop: '1rem' }}>
//                 <h3>{weather.name}, {weather.sys.country}</h3>  
//                 <p>{weather.weather[0].main} ({weather.weather[0].description})</p>       
//                 <p>🌡 {weather.main.temp} °C</p>
//                 <p>💧 Humidity: {weather.main.humidity}%</p>     
//                 <img
//                     src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
//                     alt="weather-icon"
//                 />  
//             </div>
//         )}
//         {forecast.length > 0 && (
//             <div style={{ marginTop: '2rem' }}>
//                 <h4>5-Day Forecast</h4>
//                 <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
//                 {forecast.map((item, index) => (
//                     <div
//                     key={index}
//                     style={{
//                         border: '1px solid #ccc',
//                         borderRadius: '8px',
//                         padding: '1rem',
//                         width: '120px',
//                         textAlign: 'center'
//                     }}
//                     >
//                     <p style={{ fontWeight: 'bold' }}>
//                         {new Date(item.dt_txt).toLocaleDateString(undefined, {
//                         weekday: 'short',
//                         month: 'short',
//                         day: 'numeric'
//                         })}
//                     </p>
//                     <img
//                         src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
//                         alt="icon"
//                     />
//                     <p>{item.main.temp} °C</p>
//                     <p style={{ fontSize: '0.85em' }}>{item.weather[0].main}</p>
//                     </div>
//                 ))}
//                 </div>
//             </div>
//         )}
//     </div>
//   )
// }

// export default WeatherApp

import React, { useState, useEffect } from 'react';

const API_KEY = '55c5ab94d485ff84542fe9a02f59067d';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    setCity('Nay Pyi Taw');
    fetchWeather('Nay Pyi Taw');
  }, []);

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      setWeather(data);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastRes.json();

      const dailyForecast = forecastData.list.filter((item) =>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="max-w-md mx-auto text-center bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">🌤 Weather App</h2>

        <div className="flex mb-4">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
            onClick={() => fetchWeather(city)}
          >
            Search
          </button>
        </div>

        {loading && <p className="text-blue-600">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {weather && (
          <div className="bg-blue-100 rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h3>
            <p className="capitalize text-gray-700">
              {weather.weather[0].main} ({weather.weather[0].description})
            </p>
            <p className="text-2xl font-bold my-2">🌡 {weather.main.temp} °C</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather-icon"
              className="mx-auto"
            />
          </div>
        )}
      </div>

      {forecast.length > 0 && (
        <div className="max-w-4xl mx-auto mt-8">
          <h4 className="text-xl font-bold mb-4 text-center text-blue-700">5-Day Forecast</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {forecast.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 shadow text-center"
              >
                <p className="font-semibold">
                  {new Date(item.dt_txt).toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="icon"
                  className="mx-auto"
                />
                <p className="text-lg font-bold">{item.main.temp} °C</p>
                <p className="text-gray-600 text-sm">{item.weather[0].main}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
