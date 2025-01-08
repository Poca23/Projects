//TODO: L'étape suivante consiste à ajouter un script npm
// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { animate } from "./animations";
import { createList } from "./datalist";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";

const firebaseApp = initializeApp({
  /* config */
});
const db = getFirestore(firebaseApp);

async function loadCity(name) {
  const cityDoc = doc(db, `cities/${name}`);
  const snapshot = await getDoc(cityDoc);
  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

const path = require("path");

module.exports = {
  // The entry point file described above
  entry: "./src/index.js",
  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
  devtool: "eval-source-map",
};

// This is not real code, but for example purposes only
const theList = createList("users/123/tasks");
theList.addEventListener("loaded", (event) => {
  animate(theList);
});

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAWTsoAyYfKkwF3kU64fdYu2P3oiSjnwj0",
  authDomain: "livrerecettespersonnalises.firebaseapp.com",
  projectId: "livrerecettespersonnalises",
  storageBucket: "livrerecettespersonnalises.firebasestorage.app",
  messagingSenderId: "1023503151053",
  appId: "1:1023503151053:web:d9732b3cc78646f21e9e84",
  measurementId: "G-1DVXNBDN6J",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore
const db = getFirestore(app);

// Ajouter un document
async function addRecipe() {
  try {
    const docRef = await addDoc(collection(db, "recipes"), {
      title: "Tarte aux pommes",
      ingredients: ["pommes", "sucre", "farine"],
      instructions: "Mélanger les ingrédients et cuire au four.",
    });
    console.log("Document ajouté avec l'ID : ", docRef.id);
  } catch (e) {
    console.error("Erreur lors de l'ajout du document : ", e);
  }
}

// Lire un document
async function getRecipe(id) {
  const docRef = doc(db, "recipes", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data :", docSnap.data());
  } else {
    console.log("Aucun document trouvé !");
  }
}

// Mettre à jour un document
async function updateRecipe(id, updatedData) {
  const docRef = doc(db, "recipes", id);

  try {
    await updateDoc(docRef, updatedData);
    console.log("Document mis à jour !");
  } catch (e) {
    console.error("Erreur lors de la mise à jour : ", e);
  }
}

// Supprimer un document
async function deleteRecipe(id) {
  const docRef = doc(db, "recipes", id);

  try {
    await deleteDoc(docRef);
    console.log("Document supprimé !");
  } catch (e) {
    console.error("Erreur lors de la suppression : ", e);
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
