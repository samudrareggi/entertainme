import React from 'react'
import notfound from '../assets/notfound.png'

export default function NotFound(props) {

  return (
    <div className="vh-100 text-center" style={{ backgroundColor: "#121212" }}>
      <img src={notfound} alt="..." style={{ width: 200, paddingTop: "30vh" }} />
      <h1 className="text-warning">404 Not Found</h1>
    </div>
  )
}