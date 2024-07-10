import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Coba mengambil pengguna dari localStorage saat komponen dimuat
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Fungsi untuk mengatur pengguna saat login
  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user)); // Simpan pengguna di localStorage
  };

  // Fungsi untuk logout pengguna
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser'); // Hapus pengguna dari localStorage saat logout
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
