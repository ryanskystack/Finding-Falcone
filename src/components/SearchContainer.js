import * as React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { useHistory  } from 'react-router-dom';
import SelectionItem from './SelectionItem';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchVehicles, 
  fetchPlanets,
  addVehicles,
  addPlanet,
  setTime,
  setWarning,
} from '../redux/slice';


const SearchContainer = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector(fetchVehicles).payload.reducer.vehicles;
  const planets = useSelector(fetchPlanets).payload.reducer.planets;
  const selectedVehicles=useSelector(addVehicles).payload.reducer.selectedVehicles;
  const selectedPlanets=useSelector(addPlanet).payload.reducer.selectedPlanets;
  const [totalTime, setTotalTime] = React.useState(0);
  var isWarning=useSelector(setWarning).payload.reducer.isWarning;
  const history = useHistory();

//calculate total time based on the selected vehicles and planets
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

  const findHandler=()=>{
    let isValidate=true;
    //validation:all the planets and vehicles must be selected
    selectedPlanets.forEach(p=>{
      if (p==='') {
        dispatch(setWarning(true));
        isValidate=false;
        return;
      }
    });
    selectedVehicles.forEach(v=>{
      if (v==='') {
        dispatch(setWarning(true));
        isValidate=false;
        return;
      }
    }
    );
    if (isValidate) {
       history.push('/result');
    }   
  }

  return (
    <div >
        <div className='search__center'>
          {
            isWarning&&
              <div className='result__content' style={{color:'#dc3535'}}>
                <p>Warning: <br/>All the planets and vehicles must be selected!</p><br/>
              </div>
          }
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
              <button 
                className="search__center__button"
                onClick={findHandler}
              >
                Find Falcone!
              </button>
        </div>
    </div>  
  );
};

export default SearchContainer;