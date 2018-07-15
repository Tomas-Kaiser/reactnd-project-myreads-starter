import React, { Component } from 'react'
import * as BooksAPI from './Utils/BooksAPI'
import BookDisplay from './BookDisplay'
import { Link } from 'react-router-dom'


class SearchDisplay extends Component {
   state = {
      query: '',
      books: []
   }

   updateQuery = (query) => {
      this.setState({ query: query })

      const queryTrim = query.trim()
      if (queryTrim === '') {
         this.setState({ books: [] })
         return
      }
      BooksAPI.search(queryTrim).then((response) => {
         if (response && response.length) {
             const books = response.map((book) => {
                 const libBook = this.props.books.filter((libBook) => libBook.id === book.id)
                 const shelf = libBook ? libBook.shelf : 'none'

                 return {
                     id: book.id,
                     shelf: shelf,
                     author: book.authors,
                     title: book.title,
                     imageLinks: {
                         thumbnail: book.imageLinks.thumbnail
                     }
                 }
             })
             this.setState({ books })
         }
     })
   }


   render() {
      const { books } = this.state
      const { updateBookShelf } = this.props

      return (
         <div className="search-books">              
            <div className="search-books-bar">
            <Link
                to="/"
                className="close-search"
              >
              Close
              </Link>
              <div className="search-books-input-wrapper">
                <input
                    type="text"
                    placeholder="Search by title or author"
                    value={this.state.query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                    {
                        books.map((book) => (
                           <li key={book.id}> 
                              <BookDisplay
                                 id={book.id}
                                 imageLinks={book.imageLinks}
                                 title={book.title}
                                 author={book.authors}
                                 updateBookShelf={updateBookShelf}
                                 shelf={book.shelf}
                             />
                           </li>
                        ))
                    }
              </ol>
            </div>
          </div>
      )
   }
}

export default SearchDisplay