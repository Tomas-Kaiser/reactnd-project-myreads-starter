import React, { Component } from 'react'

class BookDisplay extends Component {
    state = {
        shelf: 'none'
    }

    handleChange = (value) => {
        const { updateBookShelf } = this.props
        updateBookShelf(this.props, value)
        this.setState({ shelf: value })
    }

    componentDidMount () {
        const { shelf } = this.props
        this.setState({ shelf })
    }

   render() {
      const { imageLinks, title, author } = this.props
      const { thumbnail } = imageLinks
      const { shelf } = this.state

      return (
      <div className="book">
         <div className="book-top">
             <div className="book-cover" style={ { width: 128, height: 193, backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover'  } }>
             </div>
             <div className="book-shelf-changer">
                 <select
                 value={ shelf }
                 onChange={ (event) => this.handleChange(event.target.value) } >
                     <option value="none" disabled>Move to...</option>
                     <option value="currentlyReading">Currently Reading</option>
                     <option value="wantToRead">Want to Read</option>
                     <option value="read">Finished Reading</option>
                     <option value="none">Remove Book</option>
                 </select>
             </div>
         </div>
         <div className="book-title">{title}</div>
         <div className="book-authors">{author}</div>
     </div>
      )
   }
}

export default BookDisplay  