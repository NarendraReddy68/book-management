const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const db = new sqlite3.Database("books.db");

app.use(cors());
app.use(bodyParser.json());

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      BookID INTEGER PRIMARY KEY,
      Title TEXT,
      Author TEXT,
      Genre TEXT,
      Pages INTEGER,
      PublishedDate TEXT
    )
  `);
});

// Endpoints
app.get("/books", (req, res) => {
  db.all("SELECT * FROM books", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM books WHERE BookID = ?", [id], (err, row) => {
    if (err) throw err;
    res.json(row);
  });
});

app.post("/books", (req, res) => {
  const { title, author, genre, pages, publishedDate } = req.body;
  db.run(
    "INSERT INTO books (Title, Author, Genre, Pages, PublishedDate) VALUES (?, ?, ?, ?, ?)",
    [title, author, genre, pages, publishedDate],
    function (err) {
      if (err) throw err;
      res.json({ BookID: this.lastID });
    }
  );
});

app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { title, author, genre, pages, publishedDate } = req.body;
  db.run(
    "UPDATE books SET Title = ?, Author = ?, Genre = ?, Pages = ?, PublishedDate = ? WHERE BookID = ?",
    [title, author, genre, pages, publishedDate, id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Book updated successfully" });
    }
  );
});

app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM books WHERE BookID = ?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Book deleted successfully" });
  });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
