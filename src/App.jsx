import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './components/Loader';

const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [location, setLocation] = useState(null);
  const [data, setData] = useState({})
  const [ubicacion, setUbicacion] = useState('')

  /* Positionlogic */
  navigator.geolocation.getCurrentPosition((position) => {
    setLongitude(position.coords.longitude);
    setLatitude(position.coords.latitude);
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
    if (latitude != null && longitude != null) {
      getWeather();
    }
  }, [latitude]);

  /* Url place*/
   const url =`https://api.openweathermap.org/data/2.5/weather?q=${ubicacion}&appid=1d4407cd8e297ed94b328101b6d05461`

   const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setUbicacion('')
    }
  }
/*CLick*/ 
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const inputCountry = form.placeNameInpu;
    setLocation(inputCountry.value);
    form.reset();

    
  };
  return (
    <div classNAme="app">
      <div className="all">
        {!location ? (
          <Loader />
        ) : (
          <>
            <div className="impu">
              <form onSubmit={handleSubmit} className="  gap-3">
                <input
                value={location}
                onChange={event => setUbicacion(event.target.value)}
                onKeyPress={searchLocation}
                type="text" placeholder="Enter Place" id="placeNameInput" />
                <input type="submit" value="Search" />
              </form>
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
              {/* <div className="botton">
                <div className="estatus">
                  <p>viento</p>
                </div>
                <div className="presion">
                  <p>presion</p>
                </div>
                <div className="vista">
                  <p>despejado</p>
                </div>
              </div> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
