const bookFunctions = require("./books");

function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last > accountB.name.last ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, book) => {
    if (book.borrows.some((transaction) => transaction.id === account.id))
      acc++;
    return acc;
  }, 0);
}

function bookIsPossessedByAccount(account, book) {
  return book.borrows.some(
    ({ id, returned }) => id === account.id && !returned
  );
}

function getBooksPossessedByAccount(account, books, authors) {
  return books.reduce((acc, book) => {
    if (bookIsPossessedByAccount(account, book)) {
      const author = bookFunctions.findAuthorById(authors, book.authorId);
      acc.push({ ...book, author });
    }
    return acc;
  }, []);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
