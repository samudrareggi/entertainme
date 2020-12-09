import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { GET_TV_DATA_BY_ID } from '../configs/query'
import { NotFound } from '../components'
import LoadingBar from 'react-top-loading-bar'
import '../styles/Card.css'
import '../styles/Fab.css'

export default function DetailSeries(props) {
  const [progress, setProgress] = useState(99)
  const { id } = useParams()
  const { loading, data } = useQuery(GET_TV_DATA_BY_ID, {
    variables: {
      _id: id
    }
  })

  useEffect(() => {
    setTimeout(() => {
      setProgress(100)
    }, 1000)
    return (() => {
      setProgress(0)
    })
  }, [])

  if (loading) return (<div className="vh-100 pt-5" style={{ backgroundColor: "#121212" }}>
    <LoadingBar color="red" progress={progress} onLoaderFinished={() => setProgress(0)} shadow={true} />
  </div>)

  if (!data.seri) return <NotFound />

  const { title, overview, poster_path, popularity, tags } = data.seri
  return (
    <div className="vh-100" style={{ backgroundColor: "#121212" }}>
      <div className="container">
        <h1 className="text-warning pt-3">TV Series</h1>
        <div className="card border-0 mt-3" style={{ height: "36rem", borderRadius: 20 }}>
          <div className="card-body row p-0 m-0 rounded">
            <div className="col-3 p-0 m-0">
              <img src={poster_path} className="p-0 m-0 w-100 h-100 rounded-left" alt="..." />
            </div>
            <div className="bodyCard col-9 rounded-right pt-3">
              <div className="d-flex row">
                <h1 className="col-10 text-white">{title}</h1>
                <div className="row col-2 pr-0 text-light">
                  <h2><i className="fas fa-star text-warning star"></i>{popularity}</h2>
                  <h6 className="pt-3">/10</h6>
                </div>
              </div>
              <p className="pt-2 textcolor">
                {overview}
              </p>
              <p className="pt-2 textcolor">
                {tags.join(', ')}
              </p>
              <div className="d-flex justify-content-end align-items-end pr-3">
                <div className="fab-container">
                  <div className="fab fab-icon-holder">
                    <i className="fas fa-cog"></i>
                  </div>

                  <ul className="fab-options">
                    <li>
                      <div className="fab-icon-holder">
                        <i className="fas fa-pen"></i>
                      </div>
                    </li>
                    <li>
                      <div className="fab-icon-holder">
                        <i className="fas fa-trash"></i>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}