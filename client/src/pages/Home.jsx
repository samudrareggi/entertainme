import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Card, LoadingSkeleton } from '../components'
import {GET_DATA} from '../configs/query'

export default function Home(props) {
  const { loading, data, refetch } = useQuery(GET_DATA)

  useEffect(() => {
      refetch()
  }, [refetch])

  if (loading) return <LoadingSkeleton />

  return (
    <div className="h-100" style={{ backgroundColor: "#121212"}}>
      <div className="container">
        <h1 className="text-warning pt-3">Movies</h1>
        <div className="d-flex row pt-2">
          {data.movies.map(datum => (
            <Card key={datum._id} data={datum} />
          ))}
        </div>
        <h1 className="text-warning pt-5">Tv Series</h1>
        <div className="d-flex row pt-2">
          {data.series.map(datum => (
            <Card key={datum._id} data={datum} />
          ))}
        </div>
      </div>
    </div>
  )
}