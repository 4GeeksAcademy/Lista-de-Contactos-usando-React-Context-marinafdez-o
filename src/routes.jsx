import React from "react";
import { Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Contact />} />
  </Routes>
);

export default AppRoutes;
