import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI'
import Search from './Search'
import MyBooks from './MyBooks'

// booksInShelfs = {}
// for shelf in shelfs:
//   booksInShelfs[shelf] = this.getBooksFromShelf(shelf)
//for shelf, books in booksInShelfs.iteritems():
//  <Book shelf={shelf} books={books}/>

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    console.log('componentDidMount');
    BooksAPI.getAll()
      .then((books) => {
        this.setState({books})
      })
  }
  handleShelfChange = (book, event) => {
    const shelf = event.target.value
    BooksAPI.update(book, shelf)
      .then((res) => {
        BooksAPI.getAll()
          .then((books) => {
            this.setState({books})
          })
      })
  }
  render() {
    const books = this.state.books;

    return (
      <Router>
        <Switch>
          <Route exact path='/' render={() => (
            <MyBooks
              handleShelfChange={this.handleShelfChange}
              books={books}
            />
          )} />
          <Route path='/search' render={() => (
            <Search
              handleShelfChange={this.handleShelfChange}
            />
          )} />
        </Switch>
      </Router>
    )
  }
}

export default BooksApp
