import React from 'react';
import '../App.css';

function PlacesList( { data, placeToSearch } ) {

    return ( 
        <div
            style={ { display: ( data.length === 0 )? 'none': 'block'}  } 
            className="list-container"
        >
            {   

                data.map( place => (
                    <ul>
                        <li>
                        <button
                            onClick={ e => placeToSearch(e.target.innerText ) }  
                        >{ place.name }</button></li>
                        <hr />
                    </ul>
                ))
            }
        </div>
    );
}

export default PlacesList;