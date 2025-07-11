import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import StarRating from './StarRating';

function Test(){
  const [movie,setMovie] = useState(0)

  return <>
    <StarRating maxRating={10} onSetRating={setMovie} color='blue'/>
    <p>This movie was rated {movie} rating</p>
  </>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}

    <StarRating maxRating={5} message={["Terrible", "Bad", "Okay", "Good", "Amaizing"]} />
    <StarRating maxRating={5} color='red' size='50' defaultRating="3" />
    <Test/>
  </React.StrictMode>
);
