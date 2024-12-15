import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EditBook() {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    }).then(() => {
      alert("Book updated successfully");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={book.title || ""}
        onChange={(e) => setBook({ ...book, title: e.target.value })}
      />
      <input
        type="text"
        value={book.genre || ""}
        onChange={(e) => setBook({ ...book, genre: e.target.value })}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditBook;
