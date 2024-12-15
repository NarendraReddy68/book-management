import React, { useState } from "react";

function AddBook() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [publishedDate, setPublishedDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, genre, author, pages, publishedDate }),
    }).then(() => {
      alert("Book added successfully");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Pages"
        value={pages}
        onChange={(e) => setPages(e.target.value)}
      />
      <input
        type="date"
        value={publishedDate}
        onChange={(e) => setPublishedDate(e.target.value)}
      />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBook;
