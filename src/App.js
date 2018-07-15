import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './Utils/BooksAPI'
import './App.css'
import ShelfDisplay from './ShelfDisplay'
import SearchDisplay from './SearchDisplay'

class BooksApp extends Component {
  state = {
    screen: 'SearchDisplay', // SearchDisplay ShelfDisplay
    books: []
  }

  componentDidMount() {
     BooksAPI.getAll().then((books) => {
      this.setState({ books }) // It is as { books: books }

    })

    BooksAPI.getAll().then(books => console.log('OBJECT', books))
  }

  // Filtering books based on shelf Curently reading / Want to read / Read
  filterBooks = (shelf) => {
    const { books } = this.state
    return books.filter((book) => book.shelf === shelf )
  }

 updateBookShelf = (book, updatedShelf) => {
    const { books } = this.state

    const isMatch = (key) => {    
      return key.id === book.id   // Return true or false
    }

    const bookIndex = books.findIndex(isMatch)
    //console.log(books.findIndex(isMatch).title)

    let stateBooks = Object.assign([], books)

    if (bookIndex === -1) {
      const newAddedBook = Object.assign({}, book)
      newAddedBook.shelf = updatedShelf
      stateBooks.push(newAddedBook)
    } else {
      stateBooks[bookIndex] = Object.assign({}, stateBooks[bookIndex])
      stateBooks[bookIndex].shelf = updatedShelf
    }
    BooksAPI.update(book, updatedShelf).then(
      this.setState({ books: stateBooks })
    )
 }

  
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <ShelfDisplay
                shelfName={'Currently reading'}
                books={this.filterBooks('currentlyReading')}
                updateBookShelf={this.updateBookShelf}
              />
              <ShelfDisplay
                shelfName={'Want to read'}
                books={this.filterBooks('wantToRead')}
                updateBookShelf={this.updateBookShelf} 
              />
              <ShelfDisplay
                shelfName={'Read'}
                books={this.filterBooks('read')}
                updateBookShelf={this.updateBookShelf}
              />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book></Link>
          </div>
        </div>
        )}/>
        
          <Route path="/search" render={() => (
            <SearchDisplay 
              books={this.state.books}
              updateBookShelf={this.updateBookShelf}            
            />   
          )}/>      
        </div>  
    )
  }
}


export default BooksApp



