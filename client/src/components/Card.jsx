import '../styles/Card.css'
import React from 'react'
import {useHistory} from 'react-router-dom'

export default function Card(props) {
  const { _id, title, overview, poster_path, popularity, tags } = props.data
  const history = useHistory()

  const changePage = (id) => {
    history.push(`/movies/${id}`)
  }
  return (
    <div className="card body border-0 p-2 col-3">
      <div className="cardTop">
        <img src={poster_path} className="card-img-top" alt="..." style={{ height: "18rem" }} />
      </div>
      <div className="card-body bodyCard">
        <h5 className="text-white-50"><span><i className="fas fa-star text-warning star"></i></span> {popularity}</h5>
        <h5 onClick={() => changePage(_id)} className="card-title text-light" style={{ cursor: "pointer" }}>{title}</h5>
        <p className="card-text text">{overview}</p>
      </div>
      <div className="card-footer" style={{ backgroundColor: "#0f1a2a" }}>
        <p style={{ color: "#9e9e9e" }}>{tags.join(', ')}</p>
      </div>
    </div>
  )
}