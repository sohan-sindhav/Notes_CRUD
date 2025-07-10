// App.jsx
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotesFeed from "./Components/NotesFeed";
import { Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import LandingPage from "./Components/LandingPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/notes/feed" element={<NotesFeed />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
