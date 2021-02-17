function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, {borrows}) => borrows[0].returned ? acc : ++acc, 0);
}

function bookCountByGenre(books) {
  const booksObj = books.reduce((acc, book) => {
    const genre = book.genre;
    if (acc.hasOwnProperty(genre)) acc[genre]++;
    else acc[genre] = 1;
    return acc;
  }, {});
  return Object.keys(booksObj)
    .map((genre) => ({
      name: genre,
      count: booksObj[genre],
    }))
    .sort((genreA, genreB) => genreB.count - genreA.count);
}

function getMostCommonGenres(books) {
  return bookCountByGenre(books).slice(0, 5);
}

function getMostPopularBooks(books) {
  return books
    .map(({ title, borrows }) => ({ name: title, count: borrows.length }))
    .sort((bookA, bookB) => bookB.count - bookA.count)
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorsObj = books.reduce((acc, book) => {
    const author = authors.find(({ id }) => id === book.authorId);
    const authorName = `${author.name.first} ${author.name.last}`;
    const borrowCount = book.borrows.length;
    if (acc.hasOwnProperty(authorName)) acc[authorName] += borrowCount;
    else acc[authorName] = borrowCount;
    return acc;
  }, {});
  return Object.keys(authorsObj)
    .map((authorName) => ({
      name: authorName,
      count: authorsObj[authorName],
    }))
    .sort((authorA, authorB) => authorB.count - authorA.count)
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
