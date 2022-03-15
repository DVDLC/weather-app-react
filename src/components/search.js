import axios from "axios";
import React, { useEffect, useState } from "react";

function Search( { data } ){

    const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const [ userInput, setUserInput ] = useState(''),
        [ placeToSearch, setPlaceToSearch ] = useState('')

    useEffect(() => {

        const paramsMapbox = () => {
            return {
                'access_token': 'pk.eyJ1IjoiaGVsbG9zciIsImEiOiJja3l0NDN4d2YxOXU2MnBtMXY4MmJqaTRmIn0.7EVehhMXj_z769Ja2HctMg',
                'limit': 5,
                'lenguaje': 'es'
            } 
        }
    
        const city = async ( place= '' ) => {
    
            try{
                const instance = axios.create({
                    baseURL: baseUrl,
                    params: paramsMapbox()
                }) 
    
                const resp = await instance.get( `${ place }.json` )
                return resp.data.features.map( place => ({
                    id: place.id,
                    name: place.place_name,
                    lng: place.center[0],
                    lat: place.center[1]
                }))  
            }
            catch{
                return []
            }
        }
    
        (async() => {
            data( await city( placeToSearch ) )
        })()

    }, [ placeToSearch, data ])
    
    return(
        <div className="input-container" >
            <input 
                type="text" 
                placeholder="City/place" 
                onChange={ e => setUserInput( e.target.value ) }
            />
            <button
                onClick={ () => setPlaceToSearch( userInput ) }
            >Search</button>
        </div>
    )
}

export default Search