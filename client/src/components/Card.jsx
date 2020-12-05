import '../styles/Card.css'

export default function Card(props) {
  const { title, overview, poster_path, popularity, tags } = props.data
  return (
    <div className="card body border-0 p-2 col-3">
      <img src={poster_path} className="card-img-top image" alt="..." style={{ height: "18rem" }}/>
      <div className="card-body bodyCard">
        <h5 className="text-white-50"><span><i className="fas fa-star text-warning star"></i></span> {popularity}</h5>
        <h5 className="card-title text-light" >{title}</h5>
        <p className="card-text text">{overview}</p>
      </div>
      <div className="card-footer" style={{ backgroundColor: "#0f1a2a"}}>
        <div className="d-flex justify-content-between">
          <p style={{ color: "#9e9e9e"}}>{tags.join(', ')}</p>
          <p style={{ cursor: "pointer" }}><i className="fas fa-trash text-danger"></i></p>
        </div>
      </div>
    </div>
  )
}