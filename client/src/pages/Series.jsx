import React from 'react'
import { useQuery } from '@apollo/client'
import { Card, LoadingSkeleton } from '../components'
import { GET_DATA } from '../configs/query'

export default function Movies(props) {
  const { loading, data } = useQuery(GET_DATA)

  if (loading) return <LoadingSkeleton />

  return (
    <div className="vh-100" style={{ backgroundColor: "#121212" }}>
      <div className="container">
        <h1 className="text-warning pt-3">Movies</h1>
        <div className="d-flex row pt-2">
          {data.movies.map(datum => (
            <Card key={datum._id} data={datum} />
          ))}
        </div>
      </div>
    </div>
  )
}