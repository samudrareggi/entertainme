import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import Card from '../components/Card'
import LoadingSkeleton from '../components/LoadingSkeleton'
import client from '../configs'

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
    series {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export default function Home(props) {
  const { loading, error, data, refetch } = useQuery(GET_DATA)

  useEffect(() => {
    const movies = client.readQuery({
      query: GET_DATA
    })

    if (movies) {
      refetch()
    }
  }, [refetch])

  if (loading) return <LoadingSkeleton />
  if (error) return <p>Error :(</p>

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