import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TableLogsPage from "./pages/TableLogsPage";
import Home from "./components/Home";
import Create from "./components/Create";
import Signup from "./pages/SignUp";
import UpdateEvent from "./components/update";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/logs" element={<TableLogsPage />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update" element={<UpdateEvent />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </>
  );
}

export default App;
