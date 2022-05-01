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

  const apiCallHandler = async () => {
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();

    // mapping original API content to create new Objects with proper informations only
    const transformedMovies = data.results.map((movieObject) => {
      // destructuring movieObject for better readability
      const { episode_id, title, opening_crawl, release_date } = movieObject;
      // returning new object with proper data
      return {
        id: episode_id,
        title: title,
        openingText: opening_crawl,
        releaseDate: release_date,
      };
    });

    setMovies(transformedMovies);
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
