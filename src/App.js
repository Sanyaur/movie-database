import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Loader from "./components/Loader";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCallHandler = async () => {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();

    console.log(response);

    try {
      // error handling
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

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
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={apiCallHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p>{error}</p>
        ) : movies.length > 0 ? (
          <MoviesList movies={movies} />
        ) : (
          <p>
            No movies yet. Click on <b>Fetch movies</b>
          </p>
        )}
      </section>
    </React.Fragment>
  );
}
export default App;
