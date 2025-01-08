import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import HomePage from "./components/ComponentHomePage/ComponentHomePage.jsx";

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
