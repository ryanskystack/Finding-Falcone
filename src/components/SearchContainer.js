import * as React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
import SelectionItem from './SelectionItem';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchToken,
  fetchVehicles, 
  fetchPlanets,
  addVehicles,
  addPlanet,
  addToSelectVehicles,
  setTime,
  reset
} from '../redux/slice';


const SearchContainer = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector(fetchVehicles).payload.reducer.vehicles;

  const planets = useSelector(fetchPlanets).payload.reducer.planets;

  const selectedVehicles=useSelector(addVehicles).payload.reducer.selectedVehicles;
  const selectedPlanets=useSelector(addPlanet).payload.reducer.selectedPlanets;
  const [totalTime, setTotalTime] = React.useState(0);

  React.useEffect(()=>{

    let time=0;
   for (let index = 0; index < 4; index++) {
    let planet = selectedPlanets[index];
    let vehicle = selectedVehicles[index];
    if (planet!==''&&vehicle!=='') {
      let distance=planets.filter(p=>p.name===planet)[0]?.distance;
      let speed=vehicles.filter(r=>r.name===vehicle)[0]?.speed;
      time+=distance/speed;
    }
  }
  setTotalTime(time);
  dispatch(setTime(time));
  }
  ,[selectedVehicles,selectedPlanets]);



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
            <Link to="/result">
              <button className="search__center__button">Find Falcone!</button>
            </Link>
        </div>
    </div>  
  );
};

export default SearchContainer;