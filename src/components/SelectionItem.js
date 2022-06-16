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
  fetchRockets, 
  fetchPlanets,
  addRocket,
  addPlanet,
  addToSelectRockets,
  reset
} from '../redux/slice';


const SelectionItem = ({index}) => {
  const dispatch = useDispatch();
  const rockets = useSelector(fetchRockets).payload.reducer.rockets;
  console.log('rockets:',rockets);

  const planets = useSelector(fetchPlanets).payload.reducer.planets;
  console.log('planets:',planets);

  const selectedRockets=useSelector(addRocket).payload.reducer.selectedRockets;
  const selectedPlanets=useSelector(addPlanet).payload.reducer.selectedPlanets;

  const toSelectRockets=useSelector(addToSelectRockets).payload.reducer.toSelectRockets;
  // const toSelectPlanets=useSelector(removePlanet).payload.reducer.toSelectPlanets;
  const [planet, setPlanet] = React.useState('');
  const [vehicle, setVehicle] = React.useState('');
  const handlePlanetChange = (event) => {
    console.log('index:',index);
    setPlanet(event.target.value);
  
    let payload=[...selectedPlanets];
    payload[index]=event.target.value;
    console.log('payload[index]:',payload[index]);
    console.log('payload:',payload);
    dispatch(addPlanet(payload));

  };
  const handleVehicleChange = (event) => {
    setVehicle(event.target.value);
    let payload=[...selectedRockets];
    payload[index]=event.target.value;
    dispatch(addRocket(payload));



  };

  var toSelectPlanets=planets

//remove selected planets from the planets array to be a list to be selected  

  selectedPlanets.forEach(element => {
    if (element!==planet) {
       toSelectPlanets=toSelectPlanets.filter(item=>item.name!==element)
    }
  })
  // var toSelectRockets
  // var toSelectRockets=[...rockets]


  React.useEffect(() => {

  //remove selected rocket's quantity from the rockets arrayto be a list to be selected
  selectedRockets.forEach(element => {
    if (element!==vehicle) {
      console.log('666 toSelectRockets:',toSelectRockets);
      let payload=toSelectRockets.map(obj =>
        obj.name === element ? { ...obj, total_no: (obj.total_no)-1 } : obj
      );
      console.log('333 payload:',payload);
      dispatch(addToSelectRockets(payload));
    }
  })
  }, [selectedRockets]);
  

  console.log('selectedPlanets:',selectedPlanets);
  // console.log('toSelectPlanets:',toSelectPlanets);
  console.log('selectedRockets:',selectedRockets);
  console.log('toSelectRockets:',toSelectRockets);

  return (
    <div >
        <div className='search__center'>
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
          <FormControl>
            <RadioGroup
              aria-labelledby="vehicle-radio-buttons-group"
              name="vehicle-radio-buttons-group"
              value={vehicle}
              onChange={handleVehicleChange}
            >
                {toSelectRockets.map((vehicle,index) => {
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
        </div>
    </div>  
  );
};

export default SelectionItem;