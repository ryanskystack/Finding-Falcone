import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const LandingPage = () => {
    
    return (
        <div className="home__wrapper--absolute">
            <header className="home__wrapper__header">
                <h1>Finding Falcone</h1>
                <p style={{marginTop:50}}>You're assigned by King Shan to seek Al Falcone</p>
            </header>
            <div className="home__wrapper__center" style={{flexDirection:'column'}}>
                <Link to="/search">
                    <button className="home__wrapper__center__button">Start task</button>
                </Link>
            </div>
            <div className="result__footer">
               <Footer />
            </div>
        </div>
    );
}

export default LandingPage;