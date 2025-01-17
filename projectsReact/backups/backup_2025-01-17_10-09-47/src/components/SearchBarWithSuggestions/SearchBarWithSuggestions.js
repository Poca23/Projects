import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBarWithSuggestions.css";

const API_KEY = "48a751c85b6b3d4c0750582c52468efb";
const API_URL = "https://api.themoviedb.org/3/search/movie";

const SearchBarWithSuggestions = ({ placeholder, value, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSelectSuggestion = (suggestion) => {
    navigate(`/detail-film/${suggestion.id}`);
  };

  const handleInputChange = async (e) => {
    onChange(e);
    const query = e.target.value.toLowerCase();
    if (query.length > 0) {
      try {
        const response = await fetch(
          `${API_URL}?api_key=${API_KEY}&query=${query}`
        );
        const data = await response.json();
        const filteredSuggestions = data.results.slice(0, 5);
        setSuggestions(filteredSuggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="search-bar-with-suggestions">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${suggestion.poster_path}`}
                alt={suggestion.title}
                className="suggestion-poster"
              />
              <span>{suggestion.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBarWithSuggestions;
