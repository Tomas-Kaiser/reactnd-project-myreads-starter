import React, { Component } from 'react'

class BookDisplay extends Component {
   render() {
      return (
      <div className="book">
         <div className="book-top">
             <div className="book-cover" style={ { width: 128, height: 193, backgroundImage: `url(${this.props.thumb})`, backgroundSize: 'cover'  } }>
             </div>
             <div className="book-shelf-changer">
                 <select                 >
                     <option value="none" disabled>Move to...</option>
                     <option value="currentlyReading">Currently Reading</option>
                     <option value="wantToRead">Want to Read</option>
                     <option value="read">Finished Reading</option>
                     <option value="none">Remove Book</option>
                 </select>
             </div>
         </div>
         <div className="book-title"></div>
         <div className="book-authors"></div>
     </div>
      )
   }
}

export default BookDisplay