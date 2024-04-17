import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
// Import your page components
import Home from "./View/Home";
import Generating from "./Generating";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Home />} />
        <Route path="/generating" element={<Generating />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
