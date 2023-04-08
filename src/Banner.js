import React, {useState, useEffect} from 'react'
import axios from './axios';
import requests from './requests';
import './Banner.css';

const Banner = () => {
    const [movie, setMovie] = useState([]); //to store whatever random movie has to be at the top
    
    useEffect(() => { //this hook is a piece of code that runs for a given condition
        async function fetchData() { //call to external api
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ]); //this will setMovie to a random chosen movie from the data requested from netflix originals
            // console.log(request.data.results[
            //     Math.floor(Math.random() * request.data.results.length - 1)
            // ]);
            // Math.floor.apply(Math.random() * request.data.results.length - 1); //picks a random number from 0-(n-1)
            return request;
        }
        fetchData();
        
    }, []);
    
    console.table(movie);
    
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        // <<< Background image
        <header className='banner' 
            style={{ //in react we can do this, add js css like code here we are passing an object and styling movie object
                backgroundSize: "cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}" 
                    )`, //the ? in case there is no movie to handle it elegantly
                backgroundPosition: "center center",
            }}
        >
            <div className="banner__contents">
                {/* title */}
                <h1 className='banner__title'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                {/* div -> 2 buttons */}
                <div className='banner__buttons'>
                    <button className='banner__button'>Play</button>
                    <button className='banner__button'>My List</button>
                </div>
                {/* description */}
                <h1 className='banner__description'>{ movie?.overview} {truncate(movie?.overview, 150)} </h1> {/* this will truncate the overview of the movie if it is 150 chars longer */}
            </div>
            {/* this will be for the transition of the banner when we scroll down */}
            <div className='banner--fadebottom' /> 
        </header>
  )
}

export default Banner