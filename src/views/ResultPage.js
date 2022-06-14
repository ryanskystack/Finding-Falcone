import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ResultsPage = () => {
    return (
    <>
        <div className="home__wrapper--absolute">
           <Header />
        </div>
        <div className="home__wrapper__center" 
             style={{flexDirection:'column'}}
        >
          <div className='result__content'>
          <p>Success! Congratulations on Finding Falcone. King Shan is mighty pleased.</p><br/>
          <p>
            {`Time taken:200`}
          </p>
          <p>
            {`Planet found:DonLon`}
          </p>
          </div>
          <div>
            <Link to="/search">
              <button className="home__wrapper__center__button">Start again</button>
            </Link>
          </div>
        </div>  
        <div className="result__footer">
           <Footer />
        </div>
     </>
    );
}

export default ResultsPage;