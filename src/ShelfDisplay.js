import React, { Component } from 'react'

function ShelfDisplay (props) {
   return (
      <div className="bookshelf">
         <h2 className="bookshelf-title">{props.shelfName}</h2>
         <div className="bookshelf-books"></div>
      </div>
   )
}

export default ShelfDisplay