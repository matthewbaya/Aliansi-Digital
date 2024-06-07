export default function FeaturedProduct() {
  return (
    <div className="card col-2">
      <img
        src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
        className="card-img-top"
        alt="Fissure in Sandstone"
      />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">excerpt</p>
        <a href="#!" className="btn btn-primary" data-mdb-ripple-init="">
          Button
        </a>
      </div>
    </div>
  );
}
