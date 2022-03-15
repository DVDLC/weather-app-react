import { useEffect, useState } from 'react';
import './App.css';
import PlaceCard from './components/finallyPlace';
import Footer from './components/footer';
import PlacesList from './components/placesList';
import Search from './components/search';


function App() {

  const [ data, setData ] = useState([]),
      [ placeToSearch, setPlaceToSearch ] = useState(''),
      [ finallyPlace, setFinanllyPlace ] = useState({})

  useEffect(() => {

    const chosenPlace = () => {
      setFinanllyPlace(data.filter( place => place.name === placeToSearch ))
    }

    chosenPlace()
    
  },[ placeToSearch, data ])

  console.log( data )
  return ( 
    <div className="App">
      <Search data={ setData }/>
      <PlacesList 
        data={ data }
        placeToSearch={ setPlaceToSearch }
      />
      <PlaceCard data={ finallyPlace } />
      <Footer />
    </div>
  );
}

export default App;
