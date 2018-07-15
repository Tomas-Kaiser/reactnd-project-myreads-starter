import React, { Component } from 'react'
import * as BooksAPI from './Utils/BooksAPI'
import BookDisplay from './BookDisplay'


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
      BooksAPI.search(queryTrim, 5).then((response) => {
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
      return (
         <div className="search-books">              
            <div className="search-books-bar">
            <a
                href=""
                className="close-search"
              >
              Close
              </a>
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
                        this.state.books.map((book) => (
                           <li key={book.id}> 
                              <BookDisplay
                                 id={book.id}
                                 imageLinks={book.imageLinks}
                                 title={book.title}
                                 author={book.authors}
                                 updateBookShelf={this.props.updateBookShelf}
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