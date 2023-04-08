import axios from "axios";

// base url to make requests to the movie database
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

//example: instance.get('/foo-bar') equals https://api.themoviedb.org/3/foo-bar
export default instance;