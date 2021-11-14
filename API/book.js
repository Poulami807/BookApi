//import
const Router = require("express").Router();
const BookModel = require("../Schema/book");
const AuthorModel = require("../Schema/author");

// book routes

/*Route           /book
Description      to get all books
Access           PUBLIC
Parameter        None
Method           GET*/

Router.get("/", async (req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

/*
Route           /book/:bookID
Description      to get specific book based on ISBN
Access           PUBLIC
Parameter        bookID
Method           GET*/

Router.get("/:bookID", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({ ISBN: req.params.bookID });
  //if  book not present
  if (!getSpecificBook) {
    return res.json({ error: `Book with ISBN:${req.params.bookId} not found` });
  }

  return res.json(getSpecificBook);
});
/*
Route           /book/category:cat
Description      to get list of books based on category
Access           PUBLIC
Parameter        cat
Method           GET*/

Router.get("/category/:cat", async (req, res) => {
  const getSpecificBook = await BookModel.find({ category: req.params.cat });
  //if  book not present
  if (!getSpecificBook) {
    return res.json({ error: `Books of category:${req.params.cat} not found` });
  }

  return res.json(getSpecificBook);
});

/*
Route           /book/author/:id
Description      to get list of books based on author
Access           PUBLIC
Parameter        id
Method           GET*/

Router.get("/author/:id", async (req, res) => {
  const getSpecificBook = await BookModel.find({ authors: req.params.id });
  //if  book not present
  if (!getSpecificBook) {
    return res.json({
      error: `Books of author(author id:${req.params.id}) not found`,
    });
  }

  return res.json(getSpecificBook);
});

/*
Route           /book/new
Description      to add new book
Access           PUBLIC
Parameter        None
Method           POST*/

Router.post("/new", async (req, res) => {

  try {
    //Destructuring
    const { newBook } = req.body; 
    await BookModel.create(newBook);
    return res.json({ message: "Book added" });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

/*
Route           /book/updateTitle/:isbn
Description      to update title of particular book
Access           PUBLIC
Parameter        isbn
Method           PUT*/

Router.put("/updateTitle/:isbn", async (req, res) => {
  //Destructuring
  const { isbn } = req.params;
  const { updatedTitle } = req.body;

  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: isbn,
    },
    {
      title: updatedTitle,
    },
    {
      new: true,
    }
  );
  return res.json({ book: updatedBook, message: "Book Title updated" });
});

/*
Route           /book/updateAuthor/:isbn
Description      to update/add author to a book
Access           PUBLIC
Parameter        isbn
Method           PUT*/

Router.put("/updateAuthor/:isbn", async (req, res) => {
  //Destructuring
  const { isbn } = req.params;
  const { newAuthor } = req.body;

  //add author to book
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: isbn,
    },
    {
      $addToSet: {
        authors: newAuthor,
      },
    },
    {
      new: true,
    }
  );
  //add the book to author's book list as well
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: newAuthor,
    },
    {
      $addToSet: {
        books: isbn,
      },
    },
    {
      new: true,
    }
  );
  return res.json({
    book: updatedBook,
    author: updatedAuthor,
    message: `New author was added to the book with ISBN: ${isbn}`,
  });
});

/*
Route           /book/delete/:isbn
Description      to delete a book
Access           PUBLIC
Parameter        isbn
Method           DELETE*/

Router.delete("/delete/:isbn", async (req, res) => {
  const { isbn } = req.params;

  const updatedBookDatabase = await BookModel.findOneAndDelete({
    ISBN: isbn,
  });
  return res.json({
    books: updatedBookDatabase,
    message: `book ${isbn} successfully deleted`,
  });
});

/*
Route           /book/deleteAuthor/:isbn/:id
Description      to delete an author from a book
Access           PUBLIC
Parameter        isbn,id
Method           DELETE*/

Router.delete("/deleteAuthor/:isbn/:id", async (req, res) => {
  //Destructuring
  const { isbn, id } = req.params;

  //delete author from book
  const updatedBook = await BookModel.findOneAndDelete(
    {
      ISBN: isbn,
    },
    {
      $pull: {
        authors: parseInt(id),
      },
    },
    {
      new: true,
    }
  );
  //delete the book from that particular author as well
  const updatedAuthor = await AuthorModel.findOneAndDelete(
    {
      id: parseInt(id),
    },
    {
      $pull: {
        books: isbn,
      },
    },
    {
      new: true,
    }
  );

  return res.json({
    books: updatedBook,
    authors: updatedAuthor,
    message: `Author(id:${id}) removed from book(${isbn})`,
  });
});

module.exports = Router;
