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


 

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="app">
      <h1>Movie Search</h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          placeholder="Search movies..."
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img 
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
              alt={movie.Title} 
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
