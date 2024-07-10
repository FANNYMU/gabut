import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "./404/ErrorPage";
import Home from "./pages/home";
import Homev2 from "./pages/v2/homev2";
import Register from "./pages/register";
import Login from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/v2" element={<Homev2 />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
