"use client";

import { Wishlist } from "@/db/models/WishlistModel";
import DeleteButton from "./DeleteButton";

export default function WishlistCard({
  data,
  getWishlist,
}: {
  data: Wishlist;
  getWishlist: () => Promise<void>;
}) {
  return (
    <div className="card col-3">
      <img
        src={data.Product?.thumbnail}
        className="card-img-top"
        alt="Fissure in Sandstone"
      />
      <div className="card-body">
        <h5 className="card-title text-center mb-5">{data.Product?.name}</h5>

        <div className="d-flex justify-content-between">
          <a href="#!" className="btn btn-primary" data-mdb-ripple-init="">
            Detail
          </a>

          <DeleteButton id={data._id} getWishlist={getWishlist}></DeleteButton>
        </div>
      </div>
    </div>
  );
}
