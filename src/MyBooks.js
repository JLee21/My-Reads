import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import BookShelf from './BookShelf';
import Header from './Header'

// booksInShelfs = {}
// for shelf in shelfs:
//   booksInShelfs[shelf] = this.getBooksFromShelf(shelf)
//for shelf, books in booksInShelfs.iteritems():
//  <Book shelf={shelf} books={books}/>

const SHELVES = [
  {value: 'currentlyReading', text: 'Currently Reading'},
  {value: 'wantToRead',       text: 'Want to Read'},
  {value: 'read',             text: 'Finished Reading'},
  {value: 'none',             text: 'None'}
]

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

export default MyBooks
