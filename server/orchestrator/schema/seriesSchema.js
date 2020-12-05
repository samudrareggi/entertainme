const { gql } = require('apollo-server')
const Controller = require('../controllers/SeriesController')

const typeDefs = gql`
  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    series: [Series]
    seri(_id: ID): Series
  }

  input newSeries {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Mutation {
    addSeries(seri: newSeries): Series
    deleteSeries(_id: ID): Series
    updateSeries(_id: ID, seri: newSeries): Series
  }
`
const resolvers = {
  Query: {
    series: () => {
      return Controller.find()
    },
    seri: (_, args) => {
      return Controller.findById(args._id)
    }
  },
  Mutation: {
    addSeries: (_, args) => {
      return Controller.create(args.seri)
    },
    deleteSeries: (_, args) => {
      return Controller.delete(args._id)
    },
    updateSeries: (_, args) => {
      return Controller.update(args._id, args.seri)
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}