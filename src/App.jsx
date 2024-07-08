import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "./404/ErrorPage";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

