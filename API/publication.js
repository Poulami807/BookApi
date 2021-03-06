//import
const Router = require("express").Router();
const PublicationModel = require("../Schema/publication");
const BookModel = require("../Schema/book");

// publication routes
/*
Route           /publication
Description      to get all publications
Access           PUBLIC
Parameter        None
Method           GET    */

Router.get("/", async (req, res) => {
  const getAllPublication = await PublicationModel.find();
  return res.json(getAllPublication);
});

/*
Route           /publication/ID
Description      to get specific publication based on id
Access           PUBLIC
Parameter        ID
Method           GET*/

Router.get("/:ID", async (req, res) => {
  const getSpecificPublication = await PublicationModel.findOne({
    id: req.params.ID,
  });
  //if  publication not present
  if (!getSpecificPublication) {
    return res.json({ error: "Publication not found" });
  }

  return res.json(getSpecificPublication);
});

/*
Route           /publication/book/:isbn
Description      to get list of publication based on a book
Access           PUBLIC
Parameter        isbn
Method           GET*/

Router.get("/book/:isbn", async (req, res) => {
  const getSpecificPublication = await PublicationModel.find({
    books: req.params.isbn,
  });
  //if  publication not present
  if (!getSpecificPublication) {
    return res.json({
      error: `Publication of book(${req.params.isbn}) not found`,
    });
  }

  return res.json(getSpecificPublication);
});

/*
Route           /publication/new
Description      to add new publication
Access           PUBLIC
Parameter        None
Method           POST*/

Router.post("/new", async (req, res) => {
  //Destructuring
  const { newPub } = req.body;

  try {
    await PublicationModel.create(newPub);
    return res.json({ message: "Publication Added" });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

/*
Route           /publication/update/:id
Description      to update publication name
Access           PUBLIC
Parameter        id
Method           PUT*/

Router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { pubNmae } = req.body;

  const UpdatePublication = await PublicationModel.findOneAndUpdate(
    {
      id: parseInt(id),
    },
    {
      name: pubName,
    },
    {
      new: true,
    }
  );
  return res.json({
    Publication: UpdatePublication,
    message: "Publication name updated",
  });
});

/*
Route           /publication/update/book/:id
Description      to update/add book to a publication
Access           PUBLIC
Parameter        id
Method           PUT*/

Router.put("/update/book/:id", async (req, res) => {
  //Destructuring
  const { id } = req.params;
  const { newBook } = req.body;

  //add book to publication
  const updatedPublication = await PublicationModel.findOneAndUpdate(
    {
      id: parseInt(id),
    },
    {
      $addToSet: {
        books: newBook,
      },
    },
    {
      new: true,
    }
  );
  //add the publication to book
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: newBook,
    },
    {
      publication: parseInt(id),
    },
    {
      new: true,
    }
  );
  return res.json({
    publication: updatedPublication,
    book: updatedBook,
    message: `New BOOK was added to the publication with id: ${id}`,
  });
});

/*
Route           /publication/delete/:id
Description      to delete a publication
Access           PUBLIC
Parameter        id
Method           DELETE*/

Router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const updatedPublicationDatabase = PublicationModel.findOneAndDelete({
    id: parseInt(id),
  });
  return res.json({
    publications: updatedPublicationDatabase,
    message: `Publication (id:${id}) successfully deleted`,
  });
});

/*
Route           /publication/deleteBook/:id/:isbn
Description      to delete a book from publication
Access           PUBLIC
Parameter        id,isbn
Method           DELETE*/

Router.delete("/deleteBook/:id/:isbn", async (req, res) => {
  //Destructuring
  const { id, isbn } = req.params;

  //delete book from publication
  const updatedPublication = await PublicationModel.findOneAndDelete(
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
  //delete the publication from that particular book as well
  const updatedBook = await BookModel.findOneAndDelete(
    {
      ISBN: isbn,
    },
    {
      publication: parseInt(id),
    },
    {
      new: true,
    }
  );

  return res.json({
    publications: updatedPublication,
    books: updatedBook,
    message: `Book(ISBN:${isbn}) removed from publication(id:${id})`,
  });
});

module.exports = Router;
