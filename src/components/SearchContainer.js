import * as React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
import SelectionItem from './SelectionItem';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchVehicles, 
  fetchPlanets,
  addVehicles,
  addPlanet,
  addToSelectVehicles,
  reset
} from '../redux/slice';


const SearchContainer = () => {

  const vehicles = useSelector(fetchVehicles).payload.reducer.vehicles;

  const planets = useSelector(fetchPlanets).payload.reducer.planets;

  const selectedVehicles=useSelector(addVehicles).payload.reducer.selectedVehicles;
  const selectedPlanets=useSelector(addPlanet).payload.reducer.selectedPlanets;

  var totalTime=0;
  for (let index = 0; index < 4; index++) {
    let planet = selectedPlanets[index];
    let vehicle = selectedVehicles[index];
    if (planet!==''&&vehicle!=='') {
      let distance=planets.filter(p=>p.name===planet)[0].distance;
      let speed=vehicles.filter(r=>r.name===vehicle)[0].speed;
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