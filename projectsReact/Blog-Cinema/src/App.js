import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import PluginFiltre from "./components/PluginFiltre/PluginFiltre";
import CategoriesPage from "./pages/PageCategories/PageCategories";
import CategoryPage from "./pages/PageCategory/PageCategory";
import DetailsFilmPage from "./pages/PageDetailFilm/PageDetailFilm";
import FavorisPage from "./pages/PageFavoris/PageFavoris";
import HomePage from "./pages/PageHome/PageHome";
import SeesFilmsPage from "./pages/PageVisionnes/PageVisionnes";
import Login from "./components/Login/Login";
import AccountPage from "./components/AccountPage/AccountPage.js"; 

const App = () => {
  return (
    <Router>
      <div>
        <PluginFiltre />
        <Routes>
          <Route path="/connexion" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categorie/:id" element={<CategoryPage />} />
          <Route path="/favoris" element={<FavorisPage />} />
          <Route path="/visionnes" element={<SeesFilmsPage />} />
          <Route path="/detail-film/:id" element={<DetailsFilmPage />} />
          <Route path="/compte" element={<AccountPage />} />{" "}
          {}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
