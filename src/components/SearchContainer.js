import * as React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
import SelectionItem from './SelectionItem';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchRockets, 
  fetchPlanets,
  addRocket,
  addPlanet,
  addToSelectRockets,
  reset
} from '../redux/slice';


const SearchContainer = () => {

  const rockets = useSelector(fetchRockets).payload.reducer.rockets;

  const planets = useSelector(fetchPlanets).payload.reducer.planets;

  const selectedRockets=useSelector(addRocket).payload.reducer.selectedRockets;
  const selectedPlanets=useSelector(addPlanet).payload.reducer.selectedPlanets;

  var totalTime=0;
  for (let index = 0; index < 4; index++) {
    let planet = selectedPlanets[index];
    let rocket = selectedRockets[index];
    if (planet!==''&&rocket!=='') {
      let distance=planets.filter(p=>p.name===planet)[0].distance;
      let speed=rockets.filter(r=>r.name===rocket)[0].speed;
      totalTime+=distance/speed;
      console.log('11distance:',distance);
      console.log('11speed:',speed);
      console.log('11 totalTime:',totalTime);
    }

  }

  return (
    <div >
        <div className='search__center'>
          <div className='search__center__content'>Select Planets you want to search in:</div>
          <div className='search__center__timeResult'>
            Time take:{totalTime}
          </div>
          <div className='search__center__rowGroup'>
            <SelectionItem index={0}/>
            <SelectionItem index={1}/>
            <SelectionItem index={2}/>
            <SelectionItem index={3}/>
          </div>
    
    
        </div>
        <div className='search__center__buttonContainer'>
            <Link to="/search">
              <button className="search__center__button">Find Falcone!</button>
            </Link>
        </div>
    </div>  
  );
};

export default SearchContainer;