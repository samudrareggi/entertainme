import client from './configs'
import { ApolloProvider } from '@apollo/client'
import Home from './pages/Home'
import Nav from './components/Nav'

function App() {
  return (
    <ApolloProvider client={ client }>
      {/* 0f1a2a */}
      <Nav/>
      <div style={{ backgroundColor: "#121212", height: "100%" }}>
        <Home/>
      </div>
    </ApolloProvider>
  );
}

export default App;
