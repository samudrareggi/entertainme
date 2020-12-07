import client from './configs'
import { ApolloProvider } from '@apollo/client'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import DetailMovie from './pages/DetailMovie'
import AddMovie from './pages/AddMovie'
import EditMovie from './pages/EditMovie'
import Nav from './components/Nav'

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
      </Switch>
    </ApolloProvider>
  );
}

export default App;
