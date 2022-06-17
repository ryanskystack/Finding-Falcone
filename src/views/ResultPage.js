import React, { useEffect,useState }  from 'react';
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
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
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ResultsPage = () => {
  const dispatch = useDispatch();
  const token = useSelector(fetchToken).payload.reducer.token;
  const vehicles = useSelector(fetchVehicles).payload.reducer.vehicles;
  // console.log('vehicles:',vehicles);

  const planets = useSelector(fetchPlanets).payload.reducer.planets;
  // console.log('planets:',planets);
  const selectedVehicles=useSelector(addVehicles).payload.reducer.selectedVehicles;
  const selectedPlanets=useSelector(addPlanet).payload.reducer.selectedPlanets;
  var time=useSelector(setTime).payload.reducer.time;
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState('');

  useEffect(()=>{
    axios.post('https://5f5ff7f790cf8d00165573ed.mockapi.io/find',{
      token:token,
      planet_names:selectedPlanets,
      vehicle_name:selectedVehicles
    })
    .then(function (response) {
      console.log('response:',response);
      setResult(response.data.planet_name);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    }
    );
  },[]);


    return (

      <div className="home__wrapper--absolute" 
            // style={{height:isLoading&&'100vh'}}
        >
        <Header />
        <div className="home__wrapper__center" 
             style={{flexDirection:'column'}}
        >
          {
            isLoading?  <div>Loading...</div> :
              <div className='search__center'>
                {
                  result!==''?
                  <div className='result__content'>
                    <p>Success! Congratulations on Finding Falcone. King Shan is mighty pleased.</p><br/>
                    <p>
                      {`Time taken:${time}`}
                    </p>
                    <p>
                      {`Planet found:${result}`}
                    </p>
                  </div>:
                  <div className='result__content'>
                    <p>Sorry! Falcone could not be found. Try again!</p><br/>
                  </div>
                }

                <div>
                  <Link to="/search">
                    <button className="home__wrapper__center__button">Start again</button>
                  </Link>
                </div>
              </div>  
          }
          <div className="home__wrapper__center__footer">
           <Footer />
          </div>
        </div>  
      </div>
    );
}

export default ResultsPage;