"use client";

import { ObjectId } from "mongodb";
import { useEffect } from "react";

import Swal from "sweetalert2";

export default function DeleteButton({
  id,
  getWishlist,
}: {
  id: string | ObjectId | undefined;
  getWishlist: () => Promise<void>;
}) {
  const deleteWishlist = async () => {
    const response = await fetch("http://localhost:3000/api/wishlists", {
      method: "DELETE",
      cache: "no-store",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const { message } = await response.json();

      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }

    const { message } = await response.json();

    Swal.fire({
      title: "Success!",
      text: message,
      icon: "success",
      confirmButtonText: "Cool",
    });
    getWishlist();
  };

  return (
    <button
      onClick={() => {
        deleteWishlist();
      }}
      className="btn btn-danger"
    >
      remove
    </button>
  );
}
