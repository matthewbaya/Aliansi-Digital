import Banner from "@/components/home-components/Banner";
import DetailInfo from "@/components/home-components/DetailInfo";
import FeaturedProduct from "@/components/home-components/FeaturedProduct";

export default function Home() {
  return (
    <>
      <Banner></Banner>
      <DetailInfo></DetailInfo>
      <h1 className="text-center mb-5">Featured Product</h1>
      <div className="container d-flex flex-wrap gap-5 justify-content-center">
        <FeaturedProduct></FeaturedProduct>
        <FeaturedProduct></FeaturedProduct>
        <FeaturedProduct></FeaturedProduct>
        <FeaturedProduct></FeaturedProduct>
      </div>
    </>
  );
}
