import { gql } from '@apollo/client'

export const GET_DATA = gql`
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
export const GET_DATA_BY_ID = gql`
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
export const GET_TV_DATA_BY_ID = gql`
  query getData($_id: ID) {
    seri(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
export const DELETE_MOVIE = gql`
  mutation DeleteMovie($_id: ID) {
    deleteMovie(_id: $_id) {
      title
    }
  }
`
export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($_id: ID, $movie: newMovie) {
    updateMovie(_id: $_id, movie: $movie) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
export const ADD_MOVIE = gql`
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