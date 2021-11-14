//import
const Router = require("express").Router();
const AuthorModel = require("../Schema/author");
const BookModel = require("../Schema/book");

// Author routes
/*Route           /author
Description      to get all authors
Access           PUBLIC
Parameter        None
Method           GET*/

Router.get("/", async (req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});

/*
Route           /author/:ID
Description      to get specific author based on id
Access           PUBLIC
Parameter        ID
Method           GET*/

Router.get("/:ID", async (req, res) => {
  const getSpecificAuthor = await AuthorModel.findOne({ id: req.params.ID });
  //if  author not present
  if (!getSpecificAuthor) {
    return res.json({ error: "Author not found" });
  }

  return res.json(getSpecificAuthor);
});

/*
Route           /author/book/:isbn
Description      to get list of authors based on a book
Access           PUBLIC
Parameter        isbn
Method           GET*/

Router.get("/book/:isbn", async (req, res) => {
  const getSpecificAuthor = await AuthorModel.find({ books: req.params.isbn });
  //if  author not present
  if (!getSpecificAuthor) {
    return res.json({
      error: `Authors of book(${req.params.isbn}) not found`,
    });
  }

  return res.json(getSpecificAuthor);
});
/*
Route           /author/new
Description      to add new author
Access           PUBLIC
Parameter        None
Method           POST*/

Router.post("/new", async (req, res) => {
  //Destructuring
  const { newAuthor } = req.body;

  try {
    await AuthorModel.create(newAuthor);
    return res.json({ message: "Author Added" });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

/*
Route           /author/update/:id
Description      to update Author name
Access           PUBLIC
Parameter        id
Method           PUT*/

Router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { authorName } = req.body;
  const UpdateAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: parseInt(id),
    },
    {
      name: authorName,
    },
    {
      new: true,
    }
  );
  return res.json({ author: UpdateAuthor, message: "Author name updated" });
});

/*
Route           /author/delete/:id
Description      to delete a author
Access           PUBLIC
Parameter        id
Method           DELETE*/

Router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const updatedAuthorDatabase = AuthorModel.findOneAndDelete({
    id: parseInt(id),
  });
  return res.json({
    authors: updatedAuthorDatabase,
    message: `author (id:${id}) successfully deleted`,
  });
});

module.exports = Router;
