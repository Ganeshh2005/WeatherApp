import { useEffect, useState } from 'react';
import './App.css';
import Highlights from './components/Highlights';
import Temperature from './components/temperature';
import Maps from './components/Maps';

function App() {
  const [city, setCity] = useState('Pune');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiurl = `https://api.weatherapi.com/v1/current.json?key=95d6b36372374720aca175149240807&q=${city}&aqi=no`;
    fetch(apiurl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);

  return (
    <>
    <div className='bg-[#1F213A] h-screen flex justify-center align-top'>
      <div className='mt-40 w-1/5 h-1/3'>
        {weatherData && (
          <Temperature
            setCity={setCity}
            weatherData={weatherData}
          />
        )}
      </div>

      <div className='mt-40 w-1/3 h-1/3 p-10 grid grid-cols-2 gap-6'>
        <h2 className='text-slate-200 text-2xl col-span-2'>Today's Highlights</h2>
        {weatherData && (
          <>
            <Highlights
              title='Wind Status'
              value={weatherData.current.wind_mph}
              unit='mph'
              direction={weatherData.current.wind_dir}
            />
            <Highlights
              title='Humidity'
              value={weatherData.current.humidity}
              unit='%'
            />
            <Highlights
              title='Visibility'
              value={weatherData.current.vis_miles}
              unit='miles'
            />
            <Highlights
              title='Air Pressure'
              value={weatherData.current.pressure_mb}
              unit='mb'
            />
          </>
        )}
      </div>
    </div>
    <Maps data={weatherData}/>
    </>
  );
}

export default App;