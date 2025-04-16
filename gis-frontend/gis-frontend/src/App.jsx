import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import MapPage from "./pages/mapPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ⬅️ dipakai di Login

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  );
}

export default App;
