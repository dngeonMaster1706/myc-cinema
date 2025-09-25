import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import MovieDetails from "./pages/MovieDetails";
import Payment from "./pages/Payment";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
