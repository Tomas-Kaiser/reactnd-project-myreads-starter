import React, { Component } from 'react'
import BookDisplay from './BookDisplay'

function ShelfDisplay (props) {
   return (
      <div className="bookshelf">
         <h2 className="bookshelf-title">{props.shelfName}</h2>
         <div className="bookshelf-books"></div>
         <ol className="books-grid">
          {props.books.sort((a, b) => {
            return a.title > b.title
          }).map((book) => (
            <li key={book.id}> 
              <BookDisplay
                id={book.id}
                imageLinks={book.imageLinks}
                title={book.title}
                author={book.authors}
                updateBookShelf={props.updateBookShelf}
                shelf={book.shelf}
                />
            </li>
          ))}
         </ol>
      </div>
   )
  }

export default ShelfDisplay