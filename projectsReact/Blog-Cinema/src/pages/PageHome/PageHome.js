import React, { useState } from "react";
import PageTemplate from "../../components/PageTemplate/PageTemplate.js";
import CarouselComponent from "../../components/Carousel/Carousel.js";
import SectionTitle from "../../components/SectionTitle/SectionTitle.js";
import SearchBarWithSuggestions from "../../components/SearchBarWithSuggestions/SearchBarWithSuggestions.js";
import "./PageHome.css";

const initialCategories = [
  "Action",
  "Fantaisie",
  "Aventure",
  "Drame",
  "SF",
  "Horreur",
  "Comédie",
  "Romantique",
];

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [categories] = useState(initialCategories);

  return (
    <PageTemplate>
      <SectionTitle
        title="Accueil DE VOTRE VIDEOTHÈQUE"
        description="Bienvenue sur votre vidéothèque !"
      />
      <div className="search-bar-container">
        <SearchBarWithSuggestions
          placeholder="Rechercher un film..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          categories={categories}
        />
      </div>
      <CarouselComponent className="carousel-component" />
    </PageTemplate>
  );
};

export default HomePage;
