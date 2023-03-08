import React, { useEffect } from 'react';

const App = () => {
  const getWeather = async (latitude, longitude) => {
    try {
      const responde = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1d4407cd8e297ed94b328101b6d05461`,
      );
      const data = await responde.json();

      console.log({ data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let latitude;
    let longitude;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        getWeather(latitude, longitude);
      },
      (error) => {
        throw error;
      },
    );
  }, []);
  return (
    <div className="app">
      <div className="all">
        <div className="impu">
          <input placeholder="Enter place" />
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>Jardin</p>
            </div>
            <div className="temp">
              <h2>19°C</h2>
            </div>
            <div className="description">
              <p>sun</p>
            </div>
          </div>
          <div className="botton">
            <div className="estatus">
              <p>viento</p>
            </div>
            <div className="presion">
              <p>presion</p>
            </div>
            <div className="vista">
              <p>despejado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
