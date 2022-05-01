import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const dummyMovies = [
    {
      id: 1,
      title: "Some Dummy Movie",
      openingText: "This is the opening text of the movie",
      releaseDate: "2021-05-18",
    },
    {
      id: 2,
      title: "Some Dummy Movie 2",
      openingText: "This is the second opening text of the movie",
      releaseDate: "2021-05-19",
    },
  ];

  const apiCallHandler = () => {
    fetch("https://swapi.dev/api/films")
      .then((response) => response.json())
      .then((data) => {
        // mapping original API content to create new Objects with necessary informations only
        const transformedMovies = data.results.map((movie) => {
          return {
            id: movie.episode_id,
            title: movie.title,
            releaseDate: movie.release_date,
            openingText: movie.opening_crawl,
          };
        });
        setMovies(transformedMovies);
      });
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={apiCallHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies.length > 0 ? movies : dummyMovies} />
      </section>
    </React.Fragment>
  );
}
export default App;
