import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import BookDetails from "./components/BookDetails";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
