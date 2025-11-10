// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page - hiển thị thông tin các route */}
        <Route path="/" element={<HomePage />} />

        {/* Route cho login */}
        <Route path="/sso/login" element={<LoginPage />} />

        {/* Route cho logout */}
        <Route path="/sso/logout" element={<LogoutPage />} />

        {/* Fallback cho các route không tồn tại */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
