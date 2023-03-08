import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [location, setLocation] = useState(null);

  
   navigator.geolocation.getCurrentPosition(
    (position) => {
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
      // console.log(latitude)
      console.log(longitude)
      console.log(latitude)
    }
  )
    const getWeather = async () =>{
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1d4407cd8e297ed94b328101b6d05461`);
      console.log(res.data)
      setLocation(res.data)
    }

    useEffect(() => {
      if(latitude != null && longitude != null){
        getWeather()
      }
    },[latitude])

  // const getWeather = async (latitude, longitude) => {
  //   try {
  //     const res = await axios.get(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1d4407cd8e297ed94b328101b6d05461`,
  //     );

  //       // setLocation(res.data[0])
  //     console.log({ data });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  
  return (
    <div className="app">
      <div className="all">
        <div className="impu">
          <input placeholder="Enter place" />
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{location?.name} </p>
            </div>
            <div className="temp">
              <h2>{Math.floor(location?.main.temp - 273.15)}°C </h2>
            </div>
            <div className="description">
              <p>{location?.weather[0].description} </p>
            </div>
          </div>
          <div className="botton">
            <div className="estatus">
              <p></p>
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
