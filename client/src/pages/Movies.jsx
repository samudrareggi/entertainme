import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import Card from '../components/Card'
import LoadingSkeleton from '../components/LoadingSkeleton'

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

const DELETE_MOVIE = gql`
  mutation DeleteMovie($_id: ID) {
    deleteMovie(_id: $_id) {
      title
    }
  }
`

export default function Movies(props) {
  const { loading, error, data, refetch } = useQuery(GET_DATA)
  const [MutationDeleteMovie] = useMutation(DELETE_MOVIE)

  const deleteItem = (e, _id) => {
    e.preventDefault()
    MutationDeleteMovie({
      variables: { _id }
    })
    refetch()
  }

  if (loading) return <LoadingSkeleton />
  if (error) return <p>Error :(</p>

  return (
    <div className="vh-100" style={{ backgroundColor: "#121212" }}>
      <div className="container">
        <h1 className="text-warning pt-3">Movies</h1>
        <div className="d-flex row pt-2">
          {data.movies.map(datum => (
            <Card key={datum._id} data={datum} deleteItem={deleteItem} />
          ))}
        </div>
      </div>
    </div>
  )
}