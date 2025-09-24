import React, { useState } from "react";
import './../styles/App.css';

const App = () => {
  const [query, setQuery] = useState(""); 
  const [movies, setMovies] = useState([]); 
  const [error, setError] = useState(""); 

  const API_KEY = "99eb9fd1";

  const handleSearch = () => {
    if (!query.trim()) return;

    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
      .then(res => res.json())
      .then(data => {
        if (data.Response === "True") {
          setMovies(data.Search);
          setError("");
        } else {
          setMovies([]);
          setError("Invalid movie name. Please try again.");
        }
      })
      .catch(() => {
        setMovies([]);
        setError("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="app">
      <h1>Movie Search</h1>

      {/* Form for Cypress test */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          value={query}
          placeholder="Search movies..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {/* Movie list as ul/li for Cypress test */}
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.imdbID} className="movie-card">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
