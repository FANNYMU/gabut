import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ErrorPage from './404/ErrorPage';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
      setCurrentUser(user);
      // Redirect to home page after successful login
      return <Navigate to="/" replace />;
  };

  const handleRegister = (user) => {
      // Redirect to login page after successful registration
      return <Navigate to="/login" replace />;
  };

  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home currentUser={currentUser} />} />
              <Route path="/register" element={<Register onRegister={handleRegister} />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/404" element={<ErrorPage />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;