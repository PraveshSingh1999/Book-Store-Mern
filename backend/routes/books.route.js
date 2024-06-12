import { Book } from "../models/book.model.js";
import express from "express";

const router = express.Router();

// Route to save a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res
        .status(400)
        .json({ message: "One or More required Fields are missing" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    res
      .status(201)
      .json({ message: "Book data is saved on the database", data: book });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route for get all books from the database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({
      message: "successfully fetched the data from the database",
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for get book by id from the database
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (book) {
      res.status(200).json({
        message:
          "successfully fetched the book data by it's ID from the database ",
        data: book,
      });
    } else {
      res.status(400).json({
        message: "Book not found, use correct Book ID",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for update a Book
router.put("/:id", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      res
        .status(400)
        .json({ message: "One or More required Fields are missing" });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, {
      title,
      author,
      publishYear,
    });

    if (result) {
      res.status(200).json({
        message: "successfully updated the book",
      });
    } else {
      res.status(400).json({
        message: "Book not found, use correct Book ID",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for Delete a Book

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    console.log(result)
    
    if (result) {
      res.status(200).json({
        message: "successfully deleted the book data",
      });
    } else {
      res.status(400).json({
        message: "Book not found, use correct Book ID",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
