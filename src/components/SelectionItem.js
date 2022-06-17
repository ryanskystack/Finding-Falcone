import * as React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchToken,
  fetchVehicles, 
  fetchPlanets,
  addVehicles,
  addPlanet,
  addToSelectVehicles,
  setTime,
  setWarning,
  reset,
  revert
} from '../redux/slice';


const SelectionItem = ({index}) => {
  const [planet, setPlanet] = React.useState('');
  const [vehicle, setVehicle] = React.useState('');
  const dispatch = useDispatch();
  const vehicles = useSelector(fetchVehicles).payload.reducer.vehicles;
  const planets = useSelector(fetchPlanets).payload.reducer.planets;
  const selectedVehicles=useSelector(addVehicles).payload.reducer.selectedVehicles;
  const selectedPlanets=useSelector(addPlanet).payload.reducer.selectedPlanets;

  const toSelectVehicles=useSelector(addToSelectVehicles).payload.reducer.toSelectVehicles;
  // const toSelectPlanets=useSelector(removePlanet).payload.reducer.toSelectPlanets;
  const resetStatus=useSelector(reset).payload.reducer.reset;


  const handlePlanetChange = (event) => {
    setPlanet(event.target.value);
  
    let payload=[...selectedPlanets];
    payload[index]=event.target.value;
    dispatch(addPlanet(payload));
    dispatch(setWarning(false));
    dispatch(revert());

  };
  const handleVehicleChange = (event) => {
    setVehicle(event.target.value);
    let payload=[...selectedVehicles];
    payload[index]=event.target.value;
    dispatch(addVehicles(payload));
    dispatch(setWarning(false));
    dispatch(revert());
  };

  var toSelectPlanets=planets

//remove selected planets from the planets array to be a list to be selected  

  selectedPlanets.forEach(element => {
    if (element!==planet) {
       toSelectPlanets=toSelectPlanets.filter(item=>item.name!==element)
    }
  })
  // var toSelectVehicles
  // var toSelectVehicles=[...vehicles]


  React.useEffect(() => {
    let payload=[...vehicles]; //copy the array
  //Reduce selected rocket's quantity from the vehicles array to be a list to be selected
    selectedVehicles.forEach(element => {
    // payload=payload.map(item=>{
    //   if (item.name===element) {
    //     return { ...item, total_no: (item.total_no)-1 } 
    //   }else {
    //     return item
    //   }
    // }    )
    payload=payload.map(obj =>
        obj.name === element ? { ...obj, total_no: (obj.total_no)-1 } : obj
      );

    // if (element!==vehicle) {
      // console.log('666 toSelectVehicles:',toSelectVehicles);
      // let payload=toSelectVehicles.map(obj =>
      //   obj.name === element ? { ...obj, total_no: (obj.total_no)-1 } : obj
      // );
      // console.log('333 payload:',payload);
      // dispatch(addToSelectVehicles(payload));
    // }

  })
    dispatch(addToSelectVehicles(payload));
  }, [selectedVehicles]);
  

  // console.log('selectedPlanets:',selectedPlanets);
  // console.log('toSelectPlanets:',toSelectPlanets);
  // console.log('selectedVehicles:',selectedVehicles);
  // console.log('toSelectVehicles:',toSelectVehicles);

  React.useEffect(() => {
    if (resetStatus) {
      setPlanet('');
      setVehicle('');
    }
  }
  , [planet,vehicle,resetStatus]);

  return (
    <div >
        <div className='search__center' style={{marginRight:20}}>
          <div style={{marginBottom:20,fontSize:20}}> Destination {index+1}</div>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="planet-select-label" sx={{color:'#fff',fontSize:20}}>Select</InputLabel>
              <Select
                labelId="planet-select-label"
                id="planet-select"
                value={planet}
                label="Planet"
                sx={{color:'#fff',fontSize:20}}
                onChange={handlePlanetChange}
              >
                {toSelectPlanets.map((item,index) => {
                    return <MenuItem key={index} value={item.name}>
                             {item.name}
                           </MenuItem>
                }
                )}
              </Select>
            </FormControl>
          </Box>
          {
            planet!==''?          <FormControl>
            <RadioGroup
              aria-labelledby="vehicle-radio-buttons-group"
              name="vehicle-radio-buttons-group"
              value={vehicle}
              onChange={handleVehicleChange}
            >
                {toSelectVehicles.map((vehicle,index) => {
                    return <FormControlLabel 
                    key={index} 
                    value={vehicle.name} 
                    control={<Radio />} 
                    label={`${vehicle.name} (${vehicle.total_no})`}
                    //check whether the max distance of the vehicle is greater than the planet distance
                    disabled={
                     (vehicle.max_distance<
                      toSelectPlanets.filter(item=>item.name===planet)[0]?.distance || vehicle.total_no===0) ? true : false
                      }
                    sx={{
                        '&.label': {
                            fontSize:20
                        }
                      }}
                    />
                }
                )}
            </RadioGroup>
          </FormControl>
          :null
          }


        </div>
    </div>  
  );
};

export default SelectionItem;