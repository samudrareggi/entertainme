import client from './configs'
import { ApolloProvider } from '@apollo/client'
import { Switch, Route } from 'react-router-dom'
import {Home, Movies, DetailMovie, AddMovie, EditMovie, Favorite} from './pages'
import {Nav, NotFound} from './components'

function App() {
  return (
    <ApolloProvider client={client}>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/movies/:id">
          <DetailMovie />
        </Route>
        <Route path="/edit-movie/:id">
          <EditMovie />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/tv">
          <Movies />
        </Route>
        <Route path="/add-movie">
          <AddMovie />
        </Route>
        <Route path="/favorites">
          <Favorite />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </ApolloProvider>
  );
}

export default App;
