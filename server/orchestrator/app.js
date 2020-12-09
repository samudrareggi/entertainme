const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const { constraintDirective, constraintDirectiveTypeDefs } = require('graphql-constraint-directive')
const movieSchema = require('./schema/movieSchema')
const seriesSchema = require('./schema/seriesSchema')

const typeDefs = gql`
  type Query
  type Mutation
`

const schema = makeExecutableSchema({
  typeDefs : [
    constraintDirectiveTypeDefs,
    typeDefs,
    movieSchema.typeDefs,
    seriesSchema.typeDefs
  ],
  resolvers : [
    constraintDirectiveTypeDefs,
    movieSchema.resolvers,
    seriesSchema.resolvers
  ],
  schemaTransforms: [constraintDirective()]
})

const server = new ApolloServer(
  {schema}
)

server.listen().then(({ url }) => {
  console.log(` Server ready at ${url}`);
});