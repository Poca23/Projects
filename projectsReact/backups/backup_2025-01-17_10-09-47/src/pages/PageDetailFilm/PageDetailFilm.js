import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import "./PageDetailFilm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEye,
  faStar,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const DetailsFilmPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerId, setTrailerId] = useState(null);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const tmdbApiKey = "48a751c85b6b3d4c0750582c52468efb";
        const tmdbResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}&language=fr-FR&append_to_response=videos`
        );
        const tmdbData = await tmdbResponse.json();
        const imdbId = tmdbData.imdb_id;
        if (!imdbId) {
          throw new Error("IMDb ID non disponible.");
        }

        const omdbApiKey = "3b12adf8";
        const omdbResponse = await fetch(
          `http://www.omdbapi.com/?i=${imdbId}&apikey=${omdbApiKey}`
        );
        const omdbData = await omdbResponse.json();
        if (omdbData.Response === "False") {
          throw new Error(omdbData.Error);
        }

        setMovie(omdbData);
        const trailer = tmdbData.videos.results.find(
          (video) => video.type === "Trailer"
        );
        if (trailer) {
          setTrailerId(trailer.key);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovie();
  }, [id]);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleWatchedClick = () => {
    setIsWatched(!isWatched);
  };

  const handleRatingChange = (index) => {
    if (index === 0 && rating === 1) {
      setRating(0);
    } else {
      setRating(index + 1);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <PageTemplate>
      <div className="film-detail-page">
        <div className="left-column">
          <img src={movie.Poster} alt={movie.Title} className="film-poster" />
          <div className="film-category">
            <strong>Category: </strong>
            {movie.Genre}
          </div>
          <div className="film-rating">
            <strong>Rate this movie: </strong>
            {[...Array(5)].map((star, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                color={index < rating ? "gold" : "gray"}
                onClick={() => handleRatingChange(index)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>

        <div className="middle-column">
          <div className="film-title-section">
            <h1>{movie.Title}</h1>
            <div className="film-icons">
              <button onClick={handleFavoriteClick}>
                <FontAwesomeIcon
                  icon={faHeart}
                  color={isFavorite ? "red" : "white"}
                />
              </button>
              <button onClick={handleWatchedClick}>
                <FontAwesomeIcon
                  icon={faEye}
                  color={isWatched ? "green" : "white"}
                />
              </button>
              <button>
                <FontAwesomeIcon icon={faShareAlt} />
              </button>
              <button>
                <FontAwesomeIcon icon={faFacebook} />
              </button>
              <button>
                <FontAwesomeIcon icon={faInstagram} />
              </button>
            </div>
          </div>
          <h3>Synopsis</h3>
          <p className="film-description">{movie.Plot}</p>
          <div className="film-details">
            <h3>Director: {movie.Director}</h3>
            <h3>Actors: {movie.Actors}</h3>
            <h3>Genre: {movie.Genre}</h3>
            <h3>Language: {movie.Language}</h3>
            <h3>Runtime: {movie.Runtime}</h3>
          </div>
        </div>

        <div className="right-column">
          <h3>Trailer</h3>
          {trailerId ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailerId}`}
              title="Film Trailer"
              className="film-trailer"
              allowFullScreen
            />
          ) : (
            <p>No trailer available.</p>
          )}
          <div className="film-ratings">
            <strong>Internet Movie Database: </strong>
            {movie.imdbRating} / 10
          </div>
          <div className="film-ratings">
            <strong>Metacritic: </strong>
            {movie.Metascore} / 100
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default DetailsFilmPage;
