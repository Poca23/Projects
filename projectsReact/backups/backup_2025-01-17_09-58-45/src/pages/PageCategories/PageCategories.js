import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageTemplate from "../../components/PageTemplate/PageTemplate.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../components/SearchBar/SearchBar";
import SectionTitle from "../../components/SectionTitle/SectionTitle.js";
import "./PageCategories.css";

const initialCategories = [
  { name: "Action", movies: [] },
  { name: "Fantaisie", movies: [] },
  { name: "Aventure", movies: [] },
  { name: "Drame", movies: [] },
  { name: "SF", movies: [] },
  { name: "Horreur", movies: [] },
  { name: "Comédie", movies: [] },
  { name: "Romantique", movies: [] },
];

const CategoriesPage = () => {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : initialCategories;
  });
  const [newCategory, setNewCategory] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (
      Array.isArray(categories) &&
      categories.every(
        (cat) =>
          typeof cat === "object" &&
          cat.hasOwnProperty("name") &&
          cat.hasOwnProperty("movies")
      )
    ) {
      localStorage.setItem("categories", JSON.stringify(categories));
    } else {
      setCategories(initialCategories);
    }
  }, [categories]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addCategory = () => {
    if (newCategory) {
      setCategories([...categories, { name: newCategory, movies: [] }]);
      setNewCategory("");
    }
  };

  const deleteCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const editCategory = (index) => {
    setEditIndex(index);
    setEditCategoryName(categories[index].name);
  };

  const saveEditCategory = (index) => {
    const updatedCategories = categories.map((cat, i) =>
      i === index ? { ...cat, name: editCategoryName } : cat
    );
    setCategories(updatedCategories);
    setEditIndex(-1);
    setEditCategoryName("");
  };

  const addMovieToCategory = (imdbID, title, category) => {
    const updatedCategories = categories.map((cat) => {
      if (cat.name === category) {
        return { ...cat, movies: [...cat.movies, { imdbID, title }] };
      }
      return cat;
    });
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  return (
    <PageTemplate>
      <div className="categories-page">
        <SectionTitle
          title="Catégories de Films"
          description="Explorez nos critiques par catégorie."
        />
        <SearchBar
          placeholder="Rechercher un film..."
          value={searchTerm}
          onChange={handleInputChange}
          categories={categories.map((cat) => cat.name)}
          onAddToCategory={addMovieToCategory}
        />

        <div className="categories-container">
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category, index) => (
              <div className="category-card" key={index}>
                {editIndex === index ? (
                  <div className="category-title">
                    <input
                      type="text"
                      value={editCategoryName}
                      onChange={(e) => setEditCategoryName(e.target.value)}
                      onBlur={() => saveEditCategory(index)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && saveEditCategory(index)
                      }
                      autoFocus
                    />
                  </div>
                ) : (
                  <div className="category-title">
                    <Link to={`/categorie/${index}`} className="category-link">
                      <h2>{category.name}</h2>
                    </Link>
                  </div>
                )}
                <div className="category-actions">
                  <button
                    className="edit-btn"
                    onClick={() => editCategory(index)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteCategory(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Aucune catégorie disponible.</p>
          )}

          <div className="add-category-card">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Nouvelle catégorie"
            />
            <button className="add-btn" onClick={addCategory}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default CategoriesPage;
