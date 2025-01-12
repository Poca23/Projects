import React, { useState, useEffect } from "react";
import PageTemplate from "../../components/PageTemplate/PageTemplate.js";
import "./PageFavoris.css";
import SectionTitle from "../../components/SectionTitle/SectionTitle.js";

const FavorisPage = () => {
  const [bestMovies, setBestMovies] = useState(() => {
    const savedBestMovies = localStorage.getItem("bestMovies");
    return savedBestMovies
      ? JSON.parse(savedBestMovies)
      : [
          {
            title: "Film 1",
            description: "Description du Film 1",
            image: "URL_Image_Film_1",
          },
          {
            title: "Film 2",
            description: "Description du Film 2",
            image: "URL_Image_Film_2",
          },
        ];
  });

  const [revoirMovies, setRevoirMovies] = useState(() => {
    const savedRevoirMovies = localStorage.getItem("revoirMovies");
    return savedRevoirMovies
      ? JSON.parse(savedRevoirMovies)
      : [
          {
            title: "Film 3",
            description: "Description du Film 3",
            image: "URL_Image_Film_3",
          },
          {
            title: "Film 4",
            description: "Description du Film 4",
            image: "URL_Image_Film_4",
          },
        ];
  });

  const [queryBest, setQueryBest] = useState("");
  const [queryRevoir, setQueryRevoir] = useState("");
  const [suggestionsBest, setSuggestionsBest] = useState([]);
  const [suggestionsRevoir, setSuggestionsRevoir] = useState([]);

  useEffect(() => {
    localStorage.setItem("bestMovies", JSON.stringify(bestMovies));
  }, [bestMovies]);

  useEffect(() => {
    localStorage.setItem("revoirMovies", JSON.stringify(revoirMovies));
  }, [revoirMovies]);

  const searchMovies = async (query, setSuggestions) => {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${query}&apikey=3b12adf8`
    );
    const data = await response.json();
    if (data.Search) {
      setSuggestions(data.Search.slice(0, 5));
    }
  };

  useEffect(() => {
    if (queryBest) {
      searchMovies(queryBest, setSuggestionsBest);
    } else {
      setSuggestionsBest([]);
    }
  }, [queryBest]);

  useEffect(() => {
    if (queryRevoir) {
      searchMovies(queryRevoir, setSuggestionsRevoir);
    } else {
      setSuggestionsRevoir([]);
    }
  }, [queryRevoir]);

  const addMovie = (movie, setMovies, querySetter, suggestionsSetter) => {
    const newMovie = {
      title: movie.Title,
      description: "", // Pas besoin de description
      image: movie.Poster,
    };
    setMovies((movies) => [...movies, newMovie]);
    querySetter("");
    suggestionsSetter([]);
  };

  const removeMovie = (index, listSetter) => {
    listSetter((movies) => movies.filter((_, i) => i !== index));
  };

  return (
    <PageTemplate>
      <SectionTitle
        title="Films Favoris"
        description="Mes films favoris classés par catégories."
      />

      <div className="favorites-page">
        <div className="movies-section">
          <div className="section-header">
            <h2>THE BEST</h2>
            <input
              type="text"
              placeholder="Rechercher un film..."
              value={queryBest}
              onChange={(e) => setQueryBest(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="movies-list">
            {suggestionsBest.length > 0 && (
              <div className="suggestions-list">
                {suggestionsBest.map((movie, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() =>
                      addMovie(
                        movie,
                        setBestMovies,
                        setQueryBest,
                        setSuggestionsBest
                      )
                    }
                  >
                    <img src={movie.Poster} alt={movie.Title} />
                    <div className="suggestion-item-content">
                      <span>{movie.Title}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {bestMovies.map((movie, index) => (
              <div className="movie-card" key={index}>
                <img src={movie.image} alt={movie.title} />
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
                <button onClick={() => removeMovie(index, setBestMovies)}>
                  Retirer
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="movies-section">
          <div className="section-header">
            <h2>A REVOIR</h2>
            <input
              type="text"
              placeholder="Rechercher un film..."
              value={queryRevoir}
              onChange={(e) => setQueryRevoir(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="movies-list">
            {suggestionsRevoir.length > 0 && (
              <div className="suggestions-list">
                {suggestionsRevoir.map((movie, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() =>
                      addMovie(
                        movie,
                        setRevoirMovies,
                        setQueryRevoir,
                        setSuggestionsRevoir
                      )
                    }
                  >
                    <img src={movie.Poster} alt={movie.Title} />
                    <div className="suggestion-item-content">
                      <span>{movie.Title}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {revoirMovies.map((movie, index) => (
              <div className="movie-card" key={index}>
                <img src={movie.image} alt={movie.title} />
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
                <button onClick={() => removeMovie(index, setRevoirMovies)}>
                  Retirer
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default FavorisPage;
