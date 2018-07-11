import React, { Component } from 'react'
import BookDisplay from './BookDisplay'

function ShelfDisplay (props) {
   return (
      <div className="bookshelf">
         <h2 className="bookshelf-title">{props.shelfName}</h2>
         <div className="bookshelf-books"></div>
         <ol className="books-grid">
         {props.books.map((book) => (
            <BookDisplay key={book.id} thumb={book.imageLinks.thumbnail} bookToShow={book}
            updateBookShelf={props.updateBookShelf}/>
          ))}
         </ol>
      </div>
   )
}

export default ShelfDisplay