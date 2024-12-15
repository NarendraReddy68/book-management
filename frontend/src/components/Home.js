import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div>
      <h1>Book Management System</h1>
      <Link to="/add">Add New Book</Link>
      <div>
        {books.map((book) => (
          <div key={book.BookID}>
            <h3>{book.Title}</h3>
            <p>Genre: {book.Genre}</p>
            <Link to={`/book/${book.BookID}`}>View Details</Link>
            <Link to={`/edit/${book.BookID}`}>Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
