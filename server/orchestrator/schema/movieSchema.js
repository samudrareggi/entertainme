const { gql } = require('apollo-server')
const Controller = require('../controllers/MoviesController')
const axios = require('axios')

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    movies: [Movie]
    movie(_id: ID): Movie
  }

  input newMovie {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Mutation {
    addMovie(movie: newMovie): Movie
    deleteMovie(_id: ID): Movie
    updateMovie(_id: ID, movie: newMovie): Movie
  }
`
const resolvers = {
  Query: {
    movies: () => {
      return Controller.find()
    },
    movie: (_, args) => {
      return Controller.findById(args._id)
    }
  },
  Mutation: {
    addMovie: (_, args) => {
      return Controller.create(args.movie)
    },
    deleteMovie: (_, args) => {
      return Controller.delete(args._id)
    },
    updateMovie: (_, args) => {
      return Controller.update(args._id, args.movie)
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}