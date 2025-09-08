import { Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import AddContact from "./pages/AddContact";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Contact />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/add" element={<AddContact />} />
    </Routes>
  );
};


export default AppRoutes;