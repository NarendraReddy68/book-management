import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Pages: {book.pages}</p>
      <p>Published Date: {book.publishedDate}</p>
    </div>
  );
}

export default BookDetails;
