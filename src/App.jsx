import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TableLogsPage from "./pages/TableLogsPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/logs" element={<TableLogsPage />} />
      </Routes>
    </>
  );
}

export default App;
