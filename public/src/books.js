function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  return books.reduce(
    (acc, book) => {
      acc[book.borrows[0].returned ? 1 : 0].push(book);
      return acc;
    },
    [[], []]
  );
}

//2x slower, but included to demonstrate use of .filter
function partitionBooksByBorrowedStatusAlt(books) {
  const result = [];
  result[0] = books.filter((book) => !book.borrows[0].returned);
  result[1] = books.filter((book) => book.borrows[0].returned);
  return result;
}

function getBorrowersForBook(book, accounts) {
  return book.borrows
    .map((transaction) => ({
      ...transaction,
      ...accounts.find((account) => account.id === transaction.id),
    }))
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
