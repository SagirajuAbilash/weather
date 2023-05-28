import axios from 'axios';
import React,  { useState } from 'react';



function Weather (){
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const [loading, setLoading] = useState(false);
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=eca9d0d37d8dda090c71c810b3a17b8e`
    
    const searchLocation = (event) => {
        
      if (event.key === 'Enter') {
        setLoading(true)
        axios.get(url).then((response) => {
          setData(response.data)
          setLoading(false)
       
          console.log(response.data)
      
        })
        setLocation('')
      }
    }

    if(loading){
        return(
            <>

            <h3 style={{textAlign:'center'}}>loading...</h3>
            </>
        )
    }
  
    return (
     <>
      <div className="app">
        <div className="search">
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text"  autoFocus/>
        </div>
        

   
            <div className="container">
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? <h1>{data.main.temp}°C</h1> : null}
              </div>
              <div className="description">
                {data.weather ? <p>{data.weather[0].main}</p> : null}
              </div>
            </div>
    
            {data.name !== undefined &&
              <div className="bottom">
                <div className="feels">
                  {data.main ? <p className='bold'>{data.main.feels_like}°C</p> : null}
                  <p>Feels Like</p>
                </div>
                <div className="humidity" style={{color:'red'}}>
                  {data.main ? <p className='bold' >{data.main.humidity}%</p> : null}
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
                  <p>Wind Speed</p>
                </div>
              </div>
            }
    
    
    
          </div>
          

        
      </div>
     
     
     
     </>
    );
}

export default Weather;