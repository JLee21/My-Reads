import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'

class Search extends Component {
  state = {
    query: '',
    books: []
  }
  onInputChange = query => {
    this.updateQuery(query);
    this.searchBooks(query);
  }
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }
  searchBooks = query => (
    BooksAPI.search(query)
      .then(books => {
        this.setState({books})
      })
  )
  render() {
    const { query, books } = this.state
    const { handleShelfChange } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to='/'>
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.query}
              onChange={this.onInputChange}
              placeholder="Search by title or author"
              onChange={(event) => this.onInputChange(event.target.value)}
              autoFocus
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {query.length > 0 && books.length > 0 && (
              books.map((book, index) => (
                <li key={index}>
                  <Book
                    book={book}
                    handleShelfChange={handleShelfChange}
                  />
                </li>
              ))
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
