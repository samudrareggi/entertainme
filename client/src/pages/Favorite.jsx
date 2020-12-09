import React, { useState, useEffect } from 'react'
import { Card } from '../components'
import { favoriteVar } from '../configs'
import LoadingBar from 'react-top-loading-bar'
import notfound from '../assets/notfound.png'

export default function Favorite(props) {
  const [progress, setProgress] = useState(99)
  const [data, setData] = useState([])
  useEffect(() => {
    const currentFav = favoriteVar()
    setData(currentFav)
    setTimeout(() => {
      setProgress(100)
    }, 1000)
    return (() => {
      setProgress(0)
    })
  }, [])

  if (progress === 99) return (<div className="vh-100" style={{ backgroundColor: "#121212" }}>
    <LoadingBar color="red" progress={progress} shadow={true}/>
  </div>)

  if (!data.length) return (
    <div className="vh-100 text-center" style={{ backgroundColor: "#121212" }}>
      <img src={notfound} alt="..." style={{ width: 200, paddingTop: "30vh" }} />
      <h1 className="text-warning">no favorites yet <i className="far fa-sad-tear"></i></h1>
    </div>)

  return (
    <div className="vh-100" style={{ backgroundColor: "#121212" }}>
      <div className="container">
        <h1 className="text-warning pt-3">Movies</h1>
        <div className="d-flex row pt-2">
          {data.map(datum => (
            <Card key={datum._id} data={datum} />
          ))}
        </div>
      </div>
    </div>
  )
}