import './App.css'
import { WiNightFog } from 'react-icons/wi'
import { ImLocation2 } from 'react-icons/im'
import { IoWaterOutline } from 'react-icons/io5'
import { WiNightCloudyGusts } from 'react-icons/wi'
import { BsCloudDrizzle, BsCloudHaze } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import getFormattedWeatherData, {
  iconUrlFromCode,
} from './services/weatherService'

function App() {
  const [query, setQuery] = useState({ q: 'russia' })
  const [unit, setUnit] = useState('metric')
  const [weather, setWeather] = useState()

  useEffect(() => {
    const fetchWeather = async () => {
      const responseData = await getFormattedWeatherData({ ...query, unit })

      if (responseData) {
        console.log(responseData)
        setWeather(responseData)
      }
    }
    fetchWeather()
  }, [query, unit])

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <img
        src='https://img.rasset.ie/001b74fe-1600.jpg'
        style={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          overflowX: 'hidden',
        }}
      ></img>
      {weather && (
        <>
          <div className='weather-left'>
            <div className='weather-info'>
              <img
                src={iconUrlFromCode(weather.icon)}
                className='w-12 my-1'
                alt=''
              />
              {/* <WiNightFog size={'80px'} style={{ color: 'white' }}></WiNightFog> */}
              <p className='weather-info-situation'>{weather.details}</p>
              <p className='weather-info-city'>
                {weather.timezone.split('/')[1]} City
              </p>
              <p className='weather-info-degree'>
                {`${Math.floor(weather.temp / 10).toFixed()}°`}
                <span className='weather-info-location'>
                  <ImLocation2
                    size={'20px'}
                    style={{ color: 'white' }}
                  ></ImLocation2>
                  <span className='weather-info-location-info'>
                    Change location
                  </span>
                </span>
              </p>
            </div>
          </div>
          <div className='weather-right'>
            <div className='weather-access-row'>
              <div className='weather-access-card'>
                <IoWaterOutline
                  size={'30px'}
                  style={{ color: 'white' }}
                ></IoWaterOutline>
                <div className='weather-access-info'>
                  <p className='weather-access-info-key'>Humidity</p>
                  <p className='weather-access-info-value'>
                    {weather.humidity}%
                  </p>
                </div>
              </div>
              <div className='weather-access-card'>
                <WiNightCloudyGusts
                  size={'30px'}
                  style={{ color: 'white' }}
                ></WiNightCloudyGusts>
                <div className='weather-access-info'>
                  <p className='weather-access-info-key'>Air pressure</p>
                  <p className='weather-access-info-value'>
                    {weather.pressure.toFixed(2)} PS
                  </p>
                </div>
              </div>
              <div className='weather-access-card'>
                <BsCloudHaze
                  size={'30px'}
                  style={{ color: 'white' }}
                ></BsCloudHaze>
                <div className='weather-access-info'>
                  <p className='weather-access-info-key'>Change of rain</p>
                  <p className='weather-access-info-value'>0%</p>
                </div>
              </div>
              <div className='weather-access-card'>
                <BsCloudDrizzle
                  size={'30px'}
                  style={{ color: 'white' }}
                ></BsCloudDrizzle>
                <div className='weather-access-info'>
                  <p className='weather-access-info-key'>Wind Speed</p>
                  <p className='weather-access-info-value'>
                    {weather.speed} km/h
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='weather-footer'>
            <div className='weather-footer-row'>
              {weather.daily.map((data, index) => {
                return (
                  <div className='weather-footer-card' key={index}>
                    <div className='weather-footer-card-top'>
                      <img
                        src={iconUrlFromCode(data.icon)}
                        className='weather-footer-card-icon'
                        alt=''
                      />
                      <p className='weather-footer-card-time'>{data.title}</p>
                    </div>
                    <p className='weather-footer-card-degree'>
                      {`${Math.floor(data.temp / 10)}°`}
                      <span className='weather-footer-card-feel'>
                        Feels like {`${(data.temp / 10).toFixed()}°`}
                      </span>
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
