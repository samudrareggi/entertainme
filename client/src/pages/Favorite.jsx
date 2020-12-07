import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import LoadingBar from 'react-top-loading-bar'
import { favoriteVar } from '../configs'
import notfound from '../assets/notfound.png'
export default function Favorite(props) {
  const [progress, setProgress] = useState(50)
  const [data, setData] = useState([])
  useEffect(() => {
    const currentFav = favoriteVar()
    setData(currentFav)
    setTimeout(() => {
      setProgress(100)
    }, 1000)
  }, [])
console.log(favoriteVar());
  if (progress) return (<div className="vh-100" style={{ backgroundColor: "#121212" }}>
    <LoadingBar color="red" progress={progress} onLoaderFinished={() => setProgress(0)} shadow={true}/>
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