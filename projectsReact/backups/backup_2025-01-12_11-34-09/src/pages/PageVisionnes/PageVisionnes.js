import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PageTemplate from "../../components/PageTemplate/PageTemplate.js";
import SectionTitle from "../../components/SectionTitle/SectionTitle.js";
import "./PageVisionnes.css";

const SeesFilmsPage = () => {
  const [seenMovies, setSeenMovies] = useState(() => {
    const savedSeenMovies = localStorage.getItem("seenMovies");
    return savedSeenMovies
      ? JSON.parse(savedSeenMovies)
      : [
          {
            title: "Film 1",
            description: "Description du Film 1",
            image: "URL_Image_Film_1",
            id: "tt1234567",
          },
          {
            title: "Film 2",
            description: "Description du Film 2",
            image: "URL_Image_Film_2",
            id: "tt2345678",
          },
        ];
  });

  const [forgetMovies, setForgetMovies] = useState(() => {
    const savedForgetMovies = localStorage.getItem("forgetMovies");
    return savedForgetMovies
      ? JSON.parse(savedForgetMovies)
      : [
          {
            title: "Film 3",
            description: "Description du Film 3",
            image: "URL_Image_Film_3",
            id: "tt3456789",
          },
          {
            title: "Film 4",
            description: "Description du Film 4",
            image: "URL_Image_Film_4",
            id: "tt4567890",
          },
        ];
  });

  const [querySeen, setQuerySeen] = useState("");
  const [queryForget, setQueryForget] = useState("");
  const [suggestionsSeen, setSuggestionsSeen] = useState([]);
  const [suggestionsForget, setSuggestionsForget] = useState([]);
  const suggestionsRefSeen = useRef(null);
  const suggestionsRefForget = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("seenMovies", JSON.stringify(seenMovies));
  }, [seenMovies]);

  useEffect(() => {
    localStorage.setItem("forgetMovies", JSON.stringify(forgetMovies));
  }, [forgetMovies]);

  const searchMovies = async (query, setSuggestions) => {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${query}&apikey=3b12adf8`
    );
    const data = await response.json();
    if (data.Search) {
      setSuggestions(data.Search.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (querySeen) {
      searchMovies(querySeen, setSuggestionsSeen);
    } else {
      setSuggestionsSeen([]);
    }
  }, [querySeen]);

  useEffect(() => {
    if (queryForget) {
      searchMovies(queryForget, setSuggestionsForget);
    } else {
      setSuggestionsForget([]);
    }
  }, [queryForget]);

  useEffect(() => {
    const adjustPosition = (ref) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const footerRect = footerRef.current.getBoundingClientRect();
        if (rect.bottom > footerRect.top) {
          ref.current.classList.add("adjust-up");
        } else {
          ref.current.classList.remove("adjust-up");
        }
      }
    };

    adjustPosition(suggestionsRefSeen);
    adjustPosition(suggestionsRefForget);
  }, [suggestionsSeen, suggestionsForget]);

  const addMovie = (movie, setMovies, querySetter, suggestionsSetter) => {
    const newMovie = {
      title: movie.Title,
      description: "",
      image: movie.Poster,
      id: movie.imdbID,
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
        title="Films Vu"
        description="Mes films déjà vus et à oublier."
      />

      <div className="vue-page">
        <div className="movies-section">
          <div className="section-header">
            <h2>Déjà vu</h2>
            <input
              type="text"
              placeholder="Rechercher un film..."
              value={querySeen}
              onChange={(e) => setQuerySeen(e.target.value)}
              className="search-input"
            />
          </div>
          {suggestionsSeen.length > 0 && (
            <div className="suggestions-list" ref={suggestionsRefSeen}>
              {suggestionsSeen.map((movie, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() =>
                    addMovie(
                      movie,
                      setSeenMovies,
                      setQuerySeen,
                      setSuggestionsSeen
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
          <div className="movies-list">
            {seenMovies.map((movie, index) => (
              <div className="movie-card" key={index}>
                <Link to={`/detail-film/${movie.id}`}>
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="poster-link"
                  />
                </Link>
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeMovie(index, setSeenMovies);
                  }}
                >
                  Retirer
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="movies-section">
          <div className="section-header">
            <h2>À oublier</h2>
            <input
              type="text"
              placeholder="Rechercher un film..."
              value={queryForget}
              onChange={(e) => setQueryForget(e.target.value)}
              className="search-input"
            />
          </div>
          {suggestionsForget.length > 0 && (
            <div className="suggestions-list" ref={suggestionsRefForget}>
              {suggestionsForget.map((movie, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() =>
                    addMovie(
                      movie,
                      setForgetMovies,
                      setQueryForget,
                      setSuggestionsForget
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
          <div className="movies-list">
            {forgetMovies.map((movie, index) => (
              <div className="movie-card" key={index}>
                <Link to={`/detail-film/${movie.id}`}>
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="poster-link"
                  />
                </Link>
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeMovie(index, setForgetMovies);
                  }}
                >
                  Retirer
                </button>
              </div>
            ))}
          </div>
        </div>
        <div ref={footerRef}></div>
      </div>
    </PageTemplate>
  );
};

export default SeesFilmsPage;
