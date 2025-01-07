import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";

const SearchBar = ({
  placeholder,
  value,
  onChange,
  categories,
  onAddToCategory,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [movieToAdd, setMovieToAdd] = useState(null);
  const suggestionsRef = useRef(null);
  const inputRef = useRef(null);

  const searchMovies = async (query) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${query}&apikey=3b12adf8`
      );
      const data = await response.json();
      if (data.Search) {
        setSuggestions(data.Search.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    onChange(e);
    if (query) {
      searchMovies(query);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter") {
      if (suggestions.length > 0) {
        const selectedMovie = suggestions[activeSuggestionIndex];
        setMovieToAdd({
          imdbID: selectedMovie.imdbID,
          title: selectedMovie.Title,
        });
        setSuggestions([]);
        onChange({ target: { value: "" } });
      }
    }
  };

  const handleClickSuggestion = (imdbID, title) => {
    setMovieToAdd({ imdbID, title });
    setSuggestions([]);
    onChange({ target: { value: "" } });
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddToCategory = () => {
    if (movieToAdd && selectedCategory) {
      onAddToCategory(movieToAdd.imdbID, movieToAdd.title, selectedCategory);
      setSelectedCategory("");
      setMovieToAdd(null);
    }
  };

  useEffect(() => {
    const adjustPosition = () => {
      if (suggestionsRef.current) {
        const rect = suggestionsRef.current.getBoundingClientRect();
        if (rect.bottom > window.innerHeight) {
          suggestionsRef.current.classList.add("adjust-up");
        } else {
          suggestionsRef.current.classList.remove("adjust-up");
        }
      }
    };

    adjustPosition();
    window.addEventListener("resize", adjustPosition);
    return () => window.removeEventListener("resize", adjustPosition);
  }, [suggestions]);

  console.log("Categories in SearchBar before render:", categories);

  if (!categories || !Array.isArray(categories)) {
    console.error("Categories are undefined or not an array:", categories);
    return null;
  }

  return (
    <div className="search-bar-wrapper" onKeyDown={handleKeyDown}>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          ref={inputRef}
        />
      </div>
      {suggestions.length > 0 && (
        <div className="suggestions-list" ref={suggestionsRef}>
          {suggestions.map((movie, index) => (
            <div
              className={`suggestion-item ${
                index === activeSuggestionIndex ? "active" : ""
              }`}
              key={index}
              onClick={() => handleClickSuggestion(movie.imdbID, movie.Title)}
            >
              <img src={movie.Poster} alt={movie.Title} />
              <div className="suggestion-item-content">
                <span>{movie.Title}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {movieToAdd && (
        <div className="add-movie-to-category">
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Choisir une catégorie</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button onClick={handleAddToCategory}>Ajouter à la catégorie</button>
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  onAddToCategory: PropTypes.func.isRequired,
};

export default SearchBar;
