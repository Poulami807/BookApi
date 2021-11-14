/*
Requirements
Schemas:
Book
 - ISBN             - String
 - Title            - String
 - Author           - [Number]
 - Language         - String
 - Publications     - Number
 - NumOfPages       - Number
 - Categories       - [String]
Author
 - id               - Number
 - name             - String
 - books            - [Sting]
Publications
 - id               - Number
 - name             - String
 - books            - [Sting]
 
---- APIs ------
Book
 - GET
    - to get all books 
    - to get specific books 
    - to get a list of books based on category 
    - to get a list of books based on author
 - POST
    - to add new book
 - PUT
    - to update book details
    - to update/add new author
 - DELETE
    - delete a book
    - delete an author from the book
Authors
 - GET
    - to get all authors 
    - to get specific author
    - to get list of author based on a book
 - POST
    - to add new author
    - to update/add new book
 - PUT
    - update author details
 - DELETE
    - delete an author
Publication
 - GET
    - to get all publication
    - to get specific publication
    - to get a list of publication based on a book.
 - POST
    - Add new publication
 - PUT
    - update publication 
    - to update/add new book
 - DELETE
    - delete a book from publication
    - delete a publication
*/

/*
Routes Needed in production
/book                               to get all books
/book/:bookID                       to get specific book based on ISBN
/book/category:cat                  to get specific books based on category
/book/author/:id                    to get list of books based on author
/author                             to get all authors
/author/:ID                         to get specific author based on id
/author/book/:isbn                  to get list of authors based on a book
/publication                        to get all publications
/publication/ID                     to get specific publication based on id
/publication/book/:isbn             to get list of publication based on a book

/book/new                           to add new book
/author/new                         to add new author
/publication/new                    to add new publication

/book/updateTitle/:isbn             to update title of a particular book
/book/updateAuthor/:isbn            to update/add author to a book
/author/update/:id                  to update Author name
/publication/update/:id             to update publication name
/publication/update/book/:id        to update/add book to a publication

/book/delete/:isbn                  to delete a book
/book/deleteAuthor/:isbn/:id        to delete an author from a book
/author/delete/:id                  to delete a author
/publication/delete/:id             to delete a publication
/publication/deleteBook/:id/:isbn   to delete a book from publication
*/