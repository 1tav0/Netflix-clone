import React, {useState ,useEffect} from 'react'
import axios from './axios'; //cool tip: { } when we import is if when we are exporting a component it is not default export else we dnt use {} 
//also, we can only have one default export component but many components in that file
import './Row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseURL = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }){
    //a state is a way to write variables in react like short term memory when we refresh it changes
    //way to keep track of movies 
    const [movies,setMovies] = useState([]); //usestate is a react hook aka empty movies array
    const [trailerUrl, setTrailerUrl] = useState("");//piece of state that will be able to get the trailer url we click hover over

    //we need a snippet of code that runs based on a specific condition/variable
    useEffect(() => { //right when that row loads we wanna request whataever movie poster the api gives us 
        async function fetchData() { //way to declare ann async function inside of a useEffect hook
            const request = await axios.get(fetchUrl); //this is doing https://api.themoviedb.org/3//discover/tv?api_key=${API_KEY}&with_networks=213
            // console.log(request.data.results); //debug to check data (arry) we get back
            setMovies(request.data.results); 
            return request;
        }
        fetchData() //normal way of calling it 
    }, [fetchUrl]);//if we leave [] empty it means run once when the row loads, and dont run again. if is not, say if [movies] it is dependent of movies so will run every single time movies loads
    //we must add to [] any variable that comes from outside  the function because it is dependant on it so it needs to change
  
    // console.log(movies);
    const opts = { //options for yotube trailer
        height: "390",
        width: "100%",
        playerVars: {
            //https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    //we create this function to handle the logic of showing the youtube trailer when we click the movie poster
    const handleClick = (movie) => {
        if (trailerUrl) { //if video is playing 
            setTrailerUrl(''); //set url to empty which closes clicking twice
        } else {
            movieTrailer(movie?.name || "") //this is a npm module function where we pass the name of the movie or if its undefined then emtpy "" and it will find a youtube trailer for it 
                .then(url => { //once the trailer is found then we return the url and do stuff with it or we will get an error so catch it and render it to the console
                    //the function will give us a full youtube url but we just need the last part of it which is the key 
                    //https://www.youtube.com/watch?v=XtMThy8QKqU
                    //this new URL(url).search returns the last part we need so we wrap it in a URLSearchParams
                    //the wrapper around allows us to use the get functionality 
                    const urlParams = new URLSearchParams(new URL(url).search);
                    // urlParams.get("v"); //will give us back the value that v equals to 
                    setTrailerUrl(urlParams.get("v"));
                }).catch(error => console.log(error));
        }
    }

    return (
    <div className="row">
        {/* title */}
        <h2>{title}</h2>
        {/* container -> movie posters */}
        <div className="row__posters">
            {/* several row posters, map looks through the returned array */}
            {movies.map(movie => (
                <img 
                    key={movie.id} //in react when we are rendering a lot of components say the array of movies we will need a key for optimization when it changes makes it a bit faster
                    //for youtube trailer to show when we click on the image
                    onClick={() => handleClick(movie)}
                    className={`row__poster ${isLargeRow && "row_posterLarge"}`} //string concatination if its a large row it gets a different name for css styling
                    src={`${baseURL}${isLargeRow ? movie.poster_path: movie.backdrop_path}`} 
                    alt={movie.name} /> //look through the array and show its image or alternatively its name not callbakc function syntax
            ))} 
        </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} {/*means when we have the trailerUrl THEN show the trailer video */}
    </div>
  )
}

export default Row