import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_DATA } from '../configs/query'
import { debounce } from 'lodash'
import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'

export default function Nav(props) {
  const { data } = useQuery(GET_DATA)
  const [result, setResult] = useState([])
  const history = useHistory()

  const onChange = debounce((event) => {
    const value = event.target.value
    const currentVal = []
    for (const property in data) {
      data[property].forEach(el => {
        currentVal.push(el)
      })
    }
    const filter = currentVal.filter(el => (el.title.toLowerCase().includes(value.toLowerCase())))
    value ? setResult(filter) : setResult([])
  }, 300)

  const onClick = (type, id) => {
    if (type === 'Movie') {
      return history.push(`/movies/${id}`)
    }
    history.push(`/tv/${id}`)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#0f1a2a' }}>
      <div className="container">
        <Link to="/" className="navbar-brand" >EMe</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <p className="nav-link dropdown-toggle m-auto" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Category
              </p>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/movies" className="dropdown-item" >Movies</Link>
                <Link to="/tv" className="dropdown-item" >Tv Series</Link>
              </div>
            </li>
            <li className="nav-item">
              <Link to="/add-movie" className="nav-link" >Add Movie</Link>
            </li>
            <li className="nav-item">
              <Link to="/favorites" className="nav-link" >Favorite</Link>
            </li>
          </ul>
          <div className="form my-2 my-lg-0 position-relative">
            <input onChange={onChange} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            {
              result &&
              <div className="card position-absolute" style={{ width: "15.2rem" }}>
                <ul className="list-group list-group-flush">
                  {
                    result.map(el => (
                      <li key={el._id} style={{ cursor: "pointer" }} onClick={() => onClick(el.__typename, el._id)} className="list-group-item">{el.title}</li>
                    ))
                  }
                </ul>
              </div>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}