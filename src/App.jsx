import React, { useState, useEffect } from "react";

const API_KEY = "9a0267cd"; // Your OMDb API Key
const API_URL = "http://www.omdbapi.com/"

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const searchMovies = async () => {
    if (!query) return;
    const response = await fetch(`${API_URL}?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    }
  };

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="container">
      <h1>Movie Search App</h1>
      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button onClick={searchMovies}>Search</button>
      </div>
      <div className="movies">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Title} ({movie.Year})</p>
            <button onClick={() => toggleFavorite(movie)}>
              {favorites.some(fav => fav.imdbID === movie.imdbID) ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        ))}
      </div>
      <h2>Favorites</h2>
      <div className="movies">
        {favorites.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Title} ({movie.Year})</p>
          </div>
        ))}
      </div>
    </div>
  );
}