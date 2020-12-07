import { Link } from 'react-router-dom'

export default function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#0f1a2a' }}>
      <div className="container">
        <Link to="/" className="navbar-brand" >EMe</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <p className="nav-link dropdown-toggle m-auto" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Category
              </p>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/movies" className="dropdown-item" >Movies</Link>
                <Link to="/tv" className="dropdown-item" >Tv Series</Link>
              </div>
            </li>
            <li className="nav-item">
              <Link to="/add-movie" className="nav-link" >Add Movie</Link>
            </li>
            <li className="nav-item">
              <Link to="/favorites" className="nav-link" >Favorite</Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}