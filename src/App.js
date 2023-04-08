import React from 'react';
import './App.css';
import Row from './Row'
import requests from './requests';
import Banner from './Banner';
import Navbar from './Navbar';

function App() {
  return (
    <div className="app">
      {/* NavBar */}
      <Navbar />
      {/* Banner */}
      <Banner />
      <Row
        title="NETFLIX ORIGNINALS" fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow //by default this is equal to {true} this is to get poster larger at the first row
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />

    </div>
  );
}

export default App;
