import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "./PluginFiltre.css";

const PluginFiltre = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const fetchMovies = async () => {
    try {
      let query = `https://api.themoviedb.org/3/discover/movie?api_key=48a751c85b6b3d4c0750582c52468efb&language=fr-FR`;
      if (selectedCategories.length > 0) {
        query += `&with_genres=${selectedCategories.join(",")}`;
      }

      let allResults = [];
      let page = 1;
      const totalPages = 5; // Ajustez le nombre de pages à récupérer

      while (page <= totalPages) {
        const response = await fetch(`${query}&page=${page}`);
        const data = await response.json();
        if (data.results) {
          allResults = allResults.concat(data.results);
        }
        page += 1;
      }

      setMovies(allResults.slice(0, 200)); // Limiter les résultats à 100 films
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const handleMovieClick = (movieId) => {
    navigate(`/detail-film/${movieId}`);
    setIsDropdownOpen(false);
  };

  const filteredMovies = movies.filter((movie) => {
    if (selectedCategories.length === 0) return true;

    return selectedCategories.some((category) =>
      movie.genre_ids.includes(category)
    );
  });

  return (
    <div className="filter-container">
      <button className="filter-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faFilter} />
      </button>
      {isSidebarOpen && (
        <div className="sidebar">
          <div className="filters">
            <h4>
              <FontAwesomeIcon icon={faFolder} /> Catégorie
            </h4>
            <div className="filter-category">
              {[
                { id: 28, name: "Action" },
                { id: 14, name: "Fantaisie" },
                { id: 12, name: "Aventure" },
                { id: 18, name: "Drame" },
                { id: 878, name: "SF" },
                { id: 27, name: "Horreur" },
                { id: 35, name: "Comédie" },
                { id: 10749, name: "Romantique" },
              ].map((category) => (
                <button
                  key={category.id}
                  className={
                    selectedCategories.includes(category.id) ? "selected" : ""
                  }
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <button
              className="show-movies-button"
              onClick={() => {
                fetchMovies();
                toggleDropdown();
              }}
            >
              Afficher les films possibles
            </button>
          </div>
        </div>
      )}
      {isDropdownOpen && (
        <div className="dropdown">
          <button className="close-dropdown-button" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="movies-list">
            {filteredMovies.map((movie, index) => (
              <div
                key={index}
                className="movie-card"
                onClick={() => handleMovieClick(movie.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PluginFiltre;
