"use client";
import WishlistCard from "@/components/WishlistCard";
import { Wishlist } from "@/db/models/WishlistModel";
import { useEffect, useState } from "react";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  async function getWishlist() {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlists",
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    // return res.json();
    const wishlists = await res.json();
    setWishlist(wishlists);
  }
  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
      <h1 className="text-center display-4 mb-5">Your Wishlist</h1>
      <div className="container">
        <div className="row gap-5">
          {wishlist.map((data: Wishlist, i) => {
            return (
              <WishlistCard
                key={i}
                data={data}
                getWishlist={getWishlist}
              ></WishlistCard>
            );
          })}
        </div>
      </div>
    </>
  );
}
