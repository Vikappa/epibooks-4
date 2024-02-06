import { useEffect, useState } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

let statoIniziale = {
  comments: [],
  isLoading: false,
  isError: false,
}


function CommentArea(props) {


  const [state, setState] = useState(statoIniziale)

  useEffect( () => {
    try {
      let response = fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' +
          this.props.asin,
        {
          headers: {
            Authorization:
              'Bearer inserisci-qui-il-tuo-token',
          },
        }
      )
      console.log(response)
      if (response.ok) {
        let comments = response.json()
        this.setState({ comments: comments, isLoading: false, isError: false })
      } else {
        console.log('error')
        setState({ isLoading: false, isError: true })
      }
    } catch (error) {
      console.log(error)
      setState({...state, isLoading: false, isError: true })
    }
    }, [])
  
    useEffect(() => {

      //if (state.asin !== this.props.asin) {
        //     this.setState({
        //       isLoading: true,
        //     })
        //     try {
        //       let response = await fetch(
        //         'https://striveschool-api.herokuapp.com/api/comments/' +
        //           this.props.asin,
        //         {
        //           headers: {
        //             Authorization: 'Bearer inserisci-qui-il-tuo-token',
        //           },
        //         }
        //       )
        //       console.log(response)
        //       if (response.ok) {
        //         let comments = await response.json()
        //         this.setState({
        //           comments: comments,
        //           isLoading: false,
        //           isError: false,
        //         })
        //       } else {
        //         this.setState({ isLoading: false, isError: true })
        //       }
        //     } catch (error) {
        //       console.log(error)
        //       this.setState({ isLoading: false, isError: true })
        //     }
        //   }

    }, [props]);

  // componentDidUpdate = async (prevProps) => {
  //   if (prevProps.asin !== this.props.asin) {
  //     this.setState({
  //       isLoading: true,
  //     })
  //     try {
  //       let response = await fetch(
  //         'https://striveschool-api.herokuapp.com/api/comments/' +
  //           this.props.asin,
  //         {
  //           headers: {
  //             Authorization: 'Bearer inserisci-qui-il-tuo-token',
  //           },
  //         }
  //       )
  //       console.log(response)
  //       if (response.ok) {
  //         let comments = await response.json()
  //         this.setState({
  //           comments: comments,
  //           isLoading: false,
  //           isError: false,
  //         })
  //       } else {
  //         this.setState({ isLoading: false, isError: true })
  //       }
  //     } catch (error) {
  //       console.log(error)
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   }
  // }


    return (
      <div className="text-center">
        {state.isLoading && <Loading />}
        {state.isError && <Error />}
        <AddComment asin={props.asin} />
        <CommentList commentsToShow={state.comments} />
      </div>
    )
  
}

export default CommentArea
