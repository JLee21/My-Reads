import React from 'react'
import PropTypes from 'prop-types';
import * as BooksAPI from './utils/BooksAPI'
import BookShelf from './BookShelf';
import Header from './Header'
import { SHELVES } from './data/Shelves'

class MyBooks extends React.Component {

  getBooksByShelf = (shelf, books) => {
    return books.filter(book => (book.shelf === shelf))
  }
  render() {
    const { handleShelfChange, books } = this.props

    return (
      <div className="app">
        <div className="list-books">
          <Header />
          {SHELVES.slice(0, SHELVES.length-1).map((shelf) => {
              // this line is called before books are fetched from server.
              const booksByShelf = this.getBooksByShelf(shelf.value, books)
              return (
                <BookShelf
                  shelf={shelf.text}
                  books={booksByShelf}
                  handleShelfChange={handleShelfChange}
                />
              )
            })
          }
          <div className="list-books-content">
          </div>
        </div>
      </div>
    )
  }
}

MyBooks.propTypes = {
  books: PropTypes.array.isRequired,
  handleShelfChange: PropTypes.func.isRequired,
};

export default MyBooks
