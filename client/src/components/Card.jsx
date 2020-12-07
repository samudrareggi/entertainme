import '../styles/Card.css'
import React from 'react'
import {useHistory} from 'react-router-dom'
import {favoriteVar} from '../configs'

export default function Card(props) {
  const { _id, title, overview, poster_path, popularity, tags } = props.data
  const history = useHistory()

  const changePage = (id) => {
    history.push(`/movies/${id}`)
  }

  const onClick = (movie) => {
    let unique = true
    const currentFav = favoriteVar()
    currentFav.forEach(el => {
      if (el._id === movie._id) {
        unique = false
      }
    })
    if (unique) favoriteVar([...currentFav, movie])
    
  }
  return (
    <div className="card body border-0 p-2 col-3">
      <div className="cardTop">
        <img src={poster_path} className="card-img-top" alt="..." style={{ height: "18rem" }} />
      </div>
      <div className="card-body bodyCard">
        <div className="d-flex row justify-content-between pr-3 pl-3">
          <h5 className="text-white-50"><span><i className="fas fa-star text-warning star"></i></span> {popularity}</h5>
          <h4 style={{ cursor: "pointer" }} onClick={() => onClick(props.data)}><i className="fas fa-heart text-danger"></i></h4>
        </div>
        <h5 onClick={() => changePage(_id)} className="card-title text-light" style={{ cursor: "pointer" }}>{title}</h5>
        <p className="card-text text">{overview}</p>
      </div>
      <div className="card-footer" style={{ backgroundColor: "#0f1a2a" }}>
        <p style={{ color: "#9e9e9e" }}>{tags.join(', ')}</p>
      </div>
    </div>
  )
}