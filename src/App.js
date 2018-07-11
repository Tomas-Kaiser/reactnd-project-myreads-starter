import React, {Component} from 'react'
import * as BooksAPI from './Utils/BooksAPI'
import './App.css'
import ShelfDisplay from './ShelfDisplay'

class BooksApp extends Component {
  state = {
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

  updateBookShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(data => {
      const updatedBooks = this.state.books

      Object.entries(data.currentlyReading).forEach(([keyData, updateData]) => {
        //console.log(key + bookLoop.id)
        if (updateData === bookLoop.id) {
          bookLoop.shelf = "currentlyReading"
        }
      })
    })

  }

  
  render() {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ShelfDisplay shelfName={'Currently reading'} books={this.filterBooks('currentlyReading')} updateBookShelf={this.updateBookShelf} />
                <ShelfDisplay shelfName={'Want to read'} books={this.filterBooks('wantToRead')} updateBookShelf={this.updateBookShelf} 
                />
                <ShelfDisplay shelfName={'Read'} books={this.filterBooks('read')} updateBookShelf={this.updateBookShelf}
                />
              </div>
            </div>
          </div>
        </div>  
    )
  }
}


export default BooksApp



