import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './components/Loader';
const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [location, setLocation] = useState(null);
  navigator.geolocation.getCurrentPosition((position) => {
    setLongitude(position.coords.longitude);
    setLatitude(position.coords.latitude);
    // console.log(latitude)
    console.log(longitude);
    console.log(latitude);
  });
  const getWeather = async () => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1d4407cd8e297ed94b328101b6d05461`,
    );
    console.log(res.data);
    setLocation(res.data);
  };

  useEffect(() => {
      getWeather();
  }, [latitude]);

  const getWeatherByCountry = async (value) =>{
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=1d4407cd8e297ed94b328101b6d05461`)
    setLocation(res.data)
  }
  const handleSubmit = (event) => { 
    event.preventDefault();
    const form = event.target;
    getWeatherByCountry(form.placeNameInput.value)
    form.reset();
    
  };

  return (
    <div className="app">
      <div className="all">
        {!location ? (
          <Loader />
        ) : (
          <>
            <div className="impu">
              <form onSubmit={handleSubmit} className="  gap-3">
                <input type="text" placeholder="Enter Place" id="placeNameInput" />
              </form>
            </div>
            <div className="container">
              <div className="top">
                <div className="location">
                  <p>{location?.name}, {location.sys.country} </p>
                </div>
                <div className="temp">
                  <h2>{Math.floor(location?.main.temp - 273.15)}°C </h2>
                </div>
                <div className="flex description">
                  <img className='w-48 h-48' src={`https://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`} alt="" />
                  <p>{location?.weather[0].description} </p>
                </div>
              </div>
              <div className="botton">
                <div className="estatus">
                  <p>Wind:</p>
                </div>
                <div className="presion">
                  <p>Pressure:</p>
                </div>
                <div className="vista">
                  <p>despejado:</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default App;
