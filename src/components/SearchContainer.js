import * as React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
import SelectionItem from './SelectionItem';

const SearchContainer = () => {
  return (
    <div >
        <div className='search__center'>
          <div className='search__center__content'>Select Planets you want to search in:</div>
          <div className='search__center__timeResult'>
            Time take:{'0'}
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