import '../styles/Card.css'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { favoriteVar } from '../configs'

export default function Card(props) {
  const { __typename, _id, title, overview, poster_path, popularity, tags } = props.data
  const history = useHistory()
  const [like, setLike] = useState(null)

  useEffect(() => {
    const currentFav = favoriteVar()
    let found = false
    if (!currentFav.length) {
      setLike(<h4 style={{ cursor: "pointer" }} onClick={() => onClick(props.data)}><i className="far fa-heart text-danger"></i></h4>)
    } else {
      currentFav.forEach(el => {
        if (el._id === _id) {
          found = true
          setLike(<h4 style={{ cursor: "pointer" }} onClick={() => onClick(props.data)}><i className="fas fa-heart text-danger"></i></h4>)
        }
      })
      if (!found) {
        setLike(<h4 style={{ cursor: "pointer" }} onClick={() => onClick(props.data)}><i className="far fa-heart text-danger"></i></h4>)
      }
    }
  }, [])

  const changePage = (type, id) => {
    if (type === 'Movie') {
      return history.push(`/movies/${id}`)
    }
    history.push(`/tv/${id}`)
  }

  const onClick = (movie) => {
    let unique = true
    const currentFav = favoriteVar()
    const filter = currentFav.filter(el => (el._id !== movie._id))
    currentFav.forEach(el => {
      if (el._id === movie._id) {
        unique = false
      }
    })
    if (unique) {
      favoriteVar([...currentFav, movie])
      setLike(<h4 style={{ cursor: "pointer" }} onClick={() => onClick(props.data)}><i className="fas fa-heart text-danger"></i></h4>)
    } else {
      favoriteVar(filter)
      setLike(<h4 style={{ cursor: "pointer" }} onClick={() => onClick(props.data)}><i className="far fa-heart text-danger"></i></h4>)
    }
  }

  return (
    <div className="card body border-0 p-2 col-3">
      <div className="cardTop">
        <img src={poster_path} className="card-img-top" alt="Image" style={{ height: "18rem" }} />
      </div>
      <div className="card-body bodyCard">
        <div className="d-flex row justify-content-between pr-3 pl-3">
          <h5 className="text-white-50"><span><i className="fas fa-star text-warning star"></i></span> {popularity}</h5>
          {
            like
          }
        </div>
        <h5 onClick={() => changePage(__typename, _id)} className="card-title text-light" style={{ cursor: "pointer" }}>{title}</h5>
        <p className="card-text text">{overview}</p>
      </div>
      <div className="card-footer" style={{ backgroundColor: "#0f1a2a" }}>
        <p style={{ color: "#9e9e9e" }}>{tags.join(', ')}</p>
      </div>
    </div>
  )
}