import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Carousel.css";

const CarouselComponent = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = "48a751c85b6b3d4c0750582c52468efb";
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=fr-FR&page=1`
      );
      const data = await response.json();
      setMovies(data.results.slice(0, 12));
    };

    fetchMovies();
  }, []);

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const movieChunks = chunkArray(movies, 6);

  return (
    <Carousel>
      {movieChunks.map((chunk, index) => (
        <Carousel.Item key={index}>
          <div className="d-flex justify-content-around">
            {chunk.map((movie) => (
              <div key={movie.id} className="carousel-movie">
                <Link to={`/detail-film/${movie.id}`}>
                  <img
                    className="d-block w-100"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
                <div className="movie-details"></div>
              </div>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
