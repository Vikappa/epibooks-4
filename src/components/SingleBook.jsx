import { Component } from 'react'
import { Card } from 'react-bootstrap'
// import CommentArea from './CommentArea'

function SingleBook(props) {

    return (
      <>
        <Card
          onClick={() => props.changeSelectedBook(props.book.asin)}
          style={{
            border:
              props.selectedBook === props.book.asin
                ? '3px solid red'
                : 'none',
          }}
          data-testid="book-card"
          >
          <Card.Img variant="top" src={props.book.img} />
          <Card.Body>
            <Card.Title style={{ color: 'black' }}>
              {props.book.title}
            </Card.Title>
          </Card.Body>
        </Card>
      </>
    )

}

export default SingleBook
