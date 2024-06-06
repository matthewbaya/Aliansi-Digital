import WishlistCard from "@/components/WishlistCard";

export default function WishlistPage() {
  return (
    <>
      <h1>Your Wishlist</h1>
      <div className="container">
        <div className="row">
          <WishlistCard></WishlistCard>
          <WishlistCard></WishlistCard>
          <WishlistCard></WishlistCard>
        </div>
      </div>
    </>
  );
}
