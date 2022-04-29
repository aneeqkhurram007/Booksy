import React from 'react'

const BookCards = ({ books }) => {
    return (
        <ul>{
            books.map(book => (
                <li key={book.id}>
                    {book.title}
                </li>
            ))
        }</ul>
    )
}

export default BookCards