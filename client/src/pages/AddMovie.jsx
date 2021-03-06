import React, { useState } from 'react'
import '../styles/Input.css'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import {ADD_MOVIE} from '../configs/query'

export default function AddMovie(props) {
  const history = useHistory()
  const [addMovie] = useMutation(ADD_MOVIE)

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
    let temp = [...input]

    const result = tags.map(el => {
      if (el.tag === value) {
        let i = temp.indexOf(el.tag)
        el.isChecked? temp.splice(i,1) : temp.push(el.tag)
        return { tag: el.tag, isChecked: el.isChecked? false: true }
      }
      return el
    })
    setInput(temp)
    setTag(result)

    if (key === 'popularity') {
      value = +value
    }

    if (key === 'tags') {
      value = temp
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
    history.push('/')
  }

  return (
    <div className="vh-100" style={{ backgroundColor: "#121212" }}>
      <div className="container pt-5 d-flex justify-content-center">
        <div className="card" style={{ backgroundColor: "#0f1a2a", borderRadius: 15 }}>
          <form onSubmit={submitHandler}>
            <h1 className="text-warning pt-3 text-center">Add Movie</h1>
            <div className="con-input">
              <input required type="text" name="title" value={inputForm.title} onChange={inputHandler} placeholder="Title" />
            </div>
            <div className="con-input">
              <textarea required placeholder="Overview" name="overview" value={inputForm.overview} onChange={inputHandler}/>
            </div>
            <div className="con-input">
              <input required type="url" name="poster_path" value={inputForm.poster_path} onChange={inputHandler} placeholder="Image" />
            </div>
            <div className="con-input">
              <input required type="number" name="popularity" defaultValue={inputForm.popularity} onChange={inputHandler} step="0.1" min="0" max="10" placeholder="Popularity" />
            </div>
            <div className="checkIn">
              {tags.map(el => (
                <div className="form-check" key={el.tag}>
                  <input required className="form-check-input" type="checkbox" name="tags" value={el.tag} onChange={inputHandler} checked={el.isChecked} />
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