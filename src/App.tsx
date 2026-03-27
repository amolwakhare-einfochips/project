import { Routes, Route, Navigate } from "react-router-dom";
import Week1CatalogPage from "./assignments/week1/pages/Week1CatalogPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/week1/catalog" />} />
      <Route path="/week1/catalog" element={<Week1CatalogPage />} />
    </Routes>
  );
}

export default App;