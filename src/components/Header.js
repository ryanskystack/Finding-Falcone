import React from 'react';
import Button from '@mui/material/Button';
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch } from 'react-redux';
import { reset} from '../redux/slice';

const Header = () => {
  const dispatch = useDispatch();

  const Reset = () => {
    dispatch(reset());
  };

  const RedirectToGeekTrust = () => {
    window.open("https://www.geektrust.com/");
  };

  return (
    <div>
      <div className='result__buttonGroup'>
        <Button 
          onClick={Reset} 
          sx={{textTransform:'capitalize',color:'#fff',fontSize:16}}
        >
          Reset
        </Button>
        <div style={{padding:'0 10px',color:'#fff'}}>  | </div>
        <Button 
          onClick={RedirectToGeekTrust} 
          sx={{textTransform:'capitalize',color:'#fff',fontSize:16}}
        >
          Geek Trust Home
        </Button>
      </div>
      <div>
        <p className='result__title'>Finding Falcone!</p>
      </div>

    </div>  

  );
}

export default Header;