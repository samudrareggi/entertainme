import React, { useState } from 'react'
import '../styles/Input.css'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useHistory, useParams } from 'react-router-dom'

const GET_DATA = gql`
  query getData {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
const GET_DATA_BY_ID = gql`
  query getData($_id: ID) {
    movie(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
const ADD_MOVIE = gql`
  mutation AddMovie($movie: newMovie) {
    addMovie(movie: $movie) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
export default function EditMovie(props) {
  const { id } = useParams()
  const history = useHistory()
  const [addMovie] = useMutation(ADD_MOVIE)
  const { refetch } = useQuery(GET_DATA)
  const { loading, error, data } = useQuery(GET_DATA_BY_ID, {
    variables: {
      _id: id
    }
  })

  const [input, setInput] = useState([])

  const [tags, setTag] = useState([
    { tag: "Action", isChecked: false},
    { tag: "Adventure", isChecked: false},
    { tag: "Animation", isChecked: false},
    { tag: "Crime", isChecked: false},
    { tag: "Drama", isChecked: false},
  ])

  const [inputForm, setInputForm] = useState({
    title: '',
    overview: '',
    poster_path: '',
    popularity: 0,
    tags: [],
  })

  const inputHandler = (e) => {
    let key = e.target.name
    let value = e.target.value
    let temp = input

    const result = tags.map(el => {
      if (el.tag === value) {
        let i = temp.indexOf(el.tag)
        el.isChecked? temp.splice(i,1) : temp.push(el.tag)
        setInput(temp)
        return { tag: el.tag, isChecked: el.isChecked? false: true }
      }
      return el
    })

    setTag(result)

    if (key === 'popularity') {
      value = +value
    }

    if (key === 'tags') {
      value = input
    }

    setInputForm({
      ...inputForm,
      [key]: value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    addMovie({
      variables: {movie: inputForm}
    })
    refetch()
    history.push('/movies')
  }

  if (loading) return <p>Loading</p>
  return (
    <div className="vh-100" style={{ backgroundColor: "#121212" }}>
      <div className="container pt-5 d-flex justify-content-center">
        <div className="card" style={{ backgroundColor: "#0f1a2a", borderRadius: 15 }}>
          <form onSubmit={submitHandler}>
            <h1 className="text-warning pt-3 text-center">Add Movies</h1>
            <div className="con-input">
              <input type="text" name="title" defaultValue={data.movie.title} onChange={inputHandler} placeholder="Title" />
            </div>
            <div className="con-input">
              <textarea placeholder="Overview" name="overview" defaultValue={data.movie.overview} onChange={inputHandler}/>
            </div>
            <div className="con-input">
              <input type="url" name="poster_path" defaultValue={data.movie.poster_path} onChange={inputHandler} placeholder="Image" />
            </div>
            <div className="con-input">
              <input type="number" name="popularity" defaultValue={data.movie.popularity} onChange={inputHandler} step="0.1" min="0" max="10" placeholder="Popularity" />
            </div>
            <div className="checkIn">
              {tags.map(el => (
                <div className="form-check" key={el.tag}>
                  <input className="form-check-input" type="checkbox" name="tags" value={el.tag} onChange={inputHandler} checked={el.tags} />
                  <label className="form-check-label">
                    {el.tag}
                  </label>
                </div>
              ))}
            </div>
            <div className="text-center m-3">
              <button className="btn btn-dark text-white-50" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}