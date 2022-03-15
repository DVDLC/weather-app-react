import React, { useState, useEffect } from 'react';
import weather from '../tormenta.png'
import axios from "axios";
import '../App.css';

function PlaceCard( { data } ) {

    const baseUrl = 'https://api.openweathermap.org/data/2.5/'
    const [ weatherData, setWeatherData ] = useState({})

    useEffect(() => {

        const paramsWeatherMap = () => {
            return {
                'appid': '7c1c49ecd067fffc5d05aaffa28b236a',
                'units': 'metric',
                'lang': 'es'
            } 
        }
    
        const weather = async ( lat, lon ) => {
    
            try{
                const instance = axios.create({
                    baseURL: baseUrl,
                    params: {...paramsWeatherMap(), lat, lon}
                }) 
    
                const resp = await instance.get('weather')
                const { weather, main, wind, clouds, } = resp.data
                return {
                    desc: weather[0].description,
                    temp: main.temp,
                    windSpeed: wind.speed,
                    clouds: clouds.all,
                    pressure: main.pressure
                }
            }
            catch{
                return []
            }
        }
    
        (async() => {
            setWeatherData( await weather( data[0]?.lat, data[0]?.lng ) )
        })()

    }, [ data ])

    console.log( weatherData )

    return ( 
        <section className='weather-card' > 
            <h2>{ data[0]?.name }</h2>
            <div className='info-container' >
                <img src={ weather } alt="" />
                <h1>{ weatherData?.temp }º</h1>
                <div>
                    <p><b>Wind speed: </b>{ weatherData?.windSpeed } m/s</p>
                    <p><b>Clouds: </b>{ weatherData?.clouds } %</p>
                    <p><b>Pressure: </b>{ weatherData?.pressure } atm</p>
                </div>
            </div>
        </section>

    );
}

export default PlaceCard;