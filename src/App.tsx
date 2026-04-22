import { Routes, Route, Navigate } from "react-router-dom";
import Week1CatalogPage from "./assignments/week1/pages/Week1CatalogPage";
import CatalogExplorerPage from "./assignments/week3/pages/CatalogExplorerPage";
import ErrorBoundary from "./shared/ui/ErrorBoundary";
import WebRTCRoomPage from "./assignments/week4/webrtc-room";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Navigate to="/week1/catalog" />} />
        <Route path="/week1/catalog" element={<Week1CatalogPage />} />
        <Route
          path="/week3/catalog-explorer"
          element={<CatalogExplorerPage />}
        />
        <Route path="/week4/webrtc-room" element={<WebRTCRoomPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;