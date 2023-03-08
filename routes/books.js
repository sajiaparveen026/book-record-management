const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const router = express.Router();

/*
     Route : /books
     Method : GET
     Description : get all books
     Access : public
     Parameters : none
*/

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Got all the books",
    data: books,
  });
});

/*
     Route : /books/issued
     Method : GET
     Description :issue book
     Access : public
     Parameters : none
*/

router.get("/issued", (req, res) => {
  const usersWithIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBooks = [];
  usersWithIssuedBook.forEach((each) => {
    const book = books.find((book) => (book.id === each.issuedBook));

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "no book have been issued..." });
  }
  return res
    .status(200)
    .json({
      success: true,
      message: "Users with the issued books",
      data: issuedBooks,
    });
});
/*
     Route : /books/:id
     Method : GET
     Description : get the book by id
     Access : public
     Parameters : id
*/

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id == id);
  if (!book) {
    return res
      .status(404)
      .json({ success: false, message: "Book does not found" });
  }
  return res
    .status(200)
    .json({ success: true, message: "book found", data: book });
});

/*
     Route : /books
     Method : POST
     Description :creating/adding a new book
     Access : public
     Parameters : none
*/

/*
     Route : /books/:id
     Method : PUT
     Description :updating book by id
     Access : public
     Parameters : id
*/



module.exports = router;
