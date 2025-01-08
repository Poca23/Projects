import React from "react";
import { Container, Typography, Button } from "@material-ui/core";
import styled from "styled-components";

const HomeContainer = styled(Container)`
  background-color: #f5f5dc; /* Blanc cassé */
  color: #6b8e23; /* Vert sauge */
`;

const HomePage = () => (
  <HomeContainer>
    <Typography variant="h3">Bienvenue dans le Livre de Recettes</Typography>
    <Button variant="contained">Voir les Recettes</Button>
  </HomeContainer>
);

export default HomePage;
