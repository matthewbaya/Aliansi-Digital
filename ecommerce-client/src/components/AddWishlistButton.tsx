"use client";

import { ObjectId } from "mongodb";
import Swal from "sweetalert2";

export default function AddWishlistButton({
  productId,
}: {
  productId: ObjectId;
}) {
  const addWishlist = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/wishlists", {
        method: "POST",
        body: JSON.stringify({
          productId,
        }),
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const { message } = await response.json();
        // console.log(message);
        Swal.fire({
          title: "Error!",
          text: message,
          icon: "error",
          confirmButtonText: "Cool",
        });
      }

      const { message } = await response.json();
      // console.log(message);
      Swal.fire({
        title: "Success!",
        text: message,
        icon: "success",
        confirmButtonText: "Cool",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={() => {
        // console.log(productId);
        addWishlist();
      }}
      className="btn btn-success"
    >
      Add to Wishlist
    </button>
  );
}
