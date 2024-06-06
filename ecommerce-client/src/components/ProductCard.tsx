import { Product } from "@/types";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card col-3">
      <img
        src={product.images[0]}
        className="card-img-top"
        alt="Fissure in Sandstone"
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.excerpt}</p>
        <div className="d-flex justify-content-between">
          <Link
            href={"/products/" + product.slug}
            className="btn btn-primary"
            data-mdb-ripple-init=""
          >
            Detail
          </Link>
          <a href="#" className="btn btn-primary">
            add to wishlist
          </a>
        </div>
      </div>
    </div>
  );
}
