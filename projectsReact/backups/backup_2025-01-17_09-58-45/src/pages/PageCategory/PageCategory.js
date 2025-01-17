import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageTemplate from "../../components/PageTemplate/PageTemplate.js";
import SectionTitle from "../../components/SectionTitle/SectionTitle.js";
import "./PageCategory.css";

const CategoryPage = () => {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const category = categories[id];
    setCategoryName(category ? category.name : "");

    if (category) {
      const fetchMovies = async () => {
        const updatedMovies = await Promise.all(
          category.movies.map(async (movie) => {
            const response = await fetch(
              `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=3b12adf8`
            );
            const data = await response.json();
            return {
              ...movie,
              poster: data.Poster,
            };
          })
        );
        setMovies(updatedMovies);
      };

      fetchMovies();
    }
  }, [id]);

  const removeMovieFromCategory = (imdbID) => {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const category = categories[id];
    if (category) {
      const updatedMovies = category.movies.filter(
        (movie) => movie.imdbID !== imdbID
      );
      categories[id].movies = updatedMovies;
      localStorage.setItem("categories", JSON.stringify(categories));
      setMovies(updatedMovies);
    }
  };

  return (
    <PageTemplate>
      <SectionTitle
        title={`Catégorie : ${categoryName}`}
        description={`Découvrez les films de la catégorie ${categoryName}.`}
      />
      <div className="category-page">
        <Link to="/categories" className="back-link">
          Retour à la liste des catégories
        </Link>
        <div className="movies-list">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.poster} alt={movie.title} />
              <h3>{movie.title}</h3>
              <button
                onClick={() => removeMovieFromCategory(movie.imdbID)}
                className="delete-movie-btn"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
};

export default CategoryPage;
