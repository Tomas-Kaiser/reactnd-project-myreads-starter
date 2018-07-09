import React, { Component } from 'react'

function ShelfDisplay (props) {
   return (
      <div className="bookshelf">
         <h2 className="bookshelf-title">{props.shelfName}</h2>
         <div className="bookshelf-books"></div>
         <ol className="books-grid">
            {props.books.map((book) => (
               <li>{book.id}</li>
            ))}
         </ol>
      </div>
   )
}

export default ShelfDisplay