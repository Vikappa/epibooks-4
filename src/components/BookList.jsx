import { useEffect, useState } from 'react'
import SingleBook from './SingleBook'
import { Col, Form, Row } from 'react-bootstrap'
import CommentArea from './CommentArea'

let initialState = {
  searchQuery: '',
  selectedBook: null,
}


function BookList(props) {

  const [state, setState] = useState(initialState)  

  const changeSelectedBook = (asin) => {
    setState({
      ...state,
      selectedBook: asin,
    })
  }


    return (
      <>
        <Row>
          <Col md={8}>
            <Row className="justify-content-center mt-5">
              <Col xs={12} md={4} className="text-center">
                <Form.Group>
                  <Form.Control
                    type="search"
                    placeholder="Cerca un libro"
                    value={state.searchQuery}
                    onChange={(e) =>
                      setState({...state, searchQuery: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-2 mt-3">
              {props.books
                .filter((b) =>
                  b.title.toLowerCase().includes(state.searchQuery)
                )
                .map((b) => (
                  <Col xs={12} md={4} key={b.asin}>
                    <SingleBook
                      book={b}
                      selectedBook={state.selectedBook}
                      changeSelectedBook={changeSelectedBook}
                    />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col md={4}>
            <CommentArea asin={state.selectedBook} />
          </Col>
        </Row>
      </>
    )
}

export default BookList
