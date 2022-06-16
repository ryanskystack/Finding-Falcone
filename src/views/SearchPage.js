import React, { useEffect,useState }  from 'react';
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchToken,
  fetchRockets, 
  fetchPlanets,
  addRocket,
  addPlanet,
  addToSelectRockets,
  reset
} from '../redux/slice';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchContainer from '../components/SearchContainer';


const mappedRequest=[
    { planets: 'https://5f5ff7f790cf8d00165573ed.mockapi.io/planets'},
    { vehicles: 'https://5f5ff7f790cf8d00165573ed.mockapi.io/vehicles'},
    // {token:'https://5f5ff7f790cf8d00165573ed.mockapi.io/token',header:'Accept: application/json'}
]

const ResultsPage = () => {
  const dispatch = useDispatch();
  const rockets = useSelector(fetchRockets).payload.reducer.rockets;
  // console.log('rockets:',rockets);

  const planets = useSelector(fetchPlanets).payload.reducer.planets;
  // console.log('planets:',planets);
  const selectedRockets=useSelector(addRocket).payload.reducer.selectedRockets;
  const selectedPlanets=useSelector(addPlanet).payload.reducer.selectedPlanets;
  const [isLoading, setIsLoading] = useState(true);



  useEffect(()=>{
      axios.get(mappedRequest[0].planets)
      .then(function (response) {
          dispatch(fetchPlanets(response.data));
 
        })
        .catch(function (error) {
          console.log(error);
        });

      axios.get(mappedRequest[1].vehicles)
      .then(function (response) {
          dispatch(fetchRockets(response.data.slice(0,4)));
          dispatch(addToSelectRockets(response.data.slice(0,4)));
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
        dispatch(fetchToken('PlmVXHswGEQxKJIpWnKCBtNMepseniTM'));
    },[]
  )

  return (

    <div  className="search__wrapper--absolute" style={{height:isLoading&&'100vh'}}>
      <Header />
      <div className="home__wrapper__center">
        {
          isLoading ? <div>Loading...</div> : <SearchContainer />
        }
        <div className="home__wrapper__center__footer">
          <Footer />
        </div>
      </div>
    </div>

  );
}

export default ResultsPage;