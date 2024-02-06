import { useState, useEffect } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

let initialState = {
  comments: [],
  isLoading: false,
  isError: false,
}

function CommentArea(props) {
  
  const [state, setState] = useState(initialState)

  useEffect(() => {
    if (props.asin) {
      setState({...state, isLoading: true})
  
      try {
        const fetchData = async () => {
          let response = await fetch(
            `https://striveschool-api.herokuapp.com/api/comments/${props.asin}`,
            {
              headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMmY2MDE4N2U1YzAwMTgxNGM1ZjYiLCJpYXQiOjE3MDcxODA5NjUsImV4cCI6MTcwODM5MDU2NX0.m18iQGAjFbus5eW2GN5NBb-m4kxJt6NRqXwEYXveaVU',
              },
            }
          )
    
          if (response.ok) {
            let comments = await response.json()
            setState({
              ...state,
              comments: comments,
              isLoading: false,
              isError: false,
            })
          } else {
            setState({ ...state, isLoading: false, isError: true })
          }
        }
    
        fetchData()
      } catch (error) {
        console.log(error)
        setState({ ...state, isLoading: false, isError: true })
      }
    }
  }, [props.asin])
  
  function addNewComment(newComment) {
    setState(prevState => ({
      ...prevState,
      comments: [...prevState.comments, newComment]
    }))
  }
  

    return (
      <div className="text-center">
        {state.isLoading && <Loading />}
        {state.isError && <Error />}
        <AddComment asin={props.asin} addNewComment={addNewComment} />
        <CommentList commentsToShow={state.comments} />
      </div>
    )
}


export default CommentArea
