import { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'


function AddComment(props) {

  let initialState = {
      comment: '',
      rate: 1,
      elementId: props.asin,
  }
  

  const [state, setState] = useState(initialState)

  useEffect(() => {
setState({...state,           
   elementId: props.asin,
})
}, [props.asin])


  const sendComment = (e) => {
    e.preventDefault()
    console.log(props)
    try {
      const sendComment = async () => {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments',
        {
          method: 'POST',
          body: JSON.stringify(state),
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMmY2MDE4N2U1YzAwMTgxNGM1ZjYiLCJpYXQiOjE3MDcxODA5NjUsImV4cCI6MTcwODM5MDU2NX0.m18iQGAjFbus5eW2GN5NBb-m4kxJt6NRqXwEYXveaVU',
          },
        }
      )
      if (response.ok) {
        alert('Recensione inviata!')
        props.addNewComment(state)
        setState({
            comment: '',
            rate: 1,
            elementId: props.asin,
        })
      } else {
        throw new Error('Qualcosa è andato storto')
      }
    }
    sendComment()
    } catch (error) {
      alert(error)
    }
  }


    return (
      <div className="my-3">
        <Form onSubmit={sendComment}>
          <Form.Group className="mb-2">
            <Form.Label>Recensione</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci qui il testo"
              value={state.comment}
              onChange={(e) =>
                setState({
                  ...state,
                    comment: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Valutazione</Form.Label>
            <Form.Control
              as="select"
              value={state.rate}
              onChange={(e) =>
                setState({
                    ...state,
                    rate: e.target.value,
                })
              }
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Invia
          </Button>
        </Form>
      </div>
    )
}


export default AddComment
