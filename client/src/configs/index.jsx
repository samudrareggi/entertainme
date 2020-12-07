import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          movies: {
             merge(existing, incoming){
              return incoming
            }
          }
        }
      }
    }
  })
})

export default client