import Banner from "@/components/home-components/Banner";
import DetailInfo from "@/components/home-components/DetailInfo";
import FeaturedProduct from "@/components/home-components/FeaturedProduct";

export default function Home() {
  return (
    <>
      <Banner></Banner>
      <DetailInfo></DetailInfo>
      <div className="container d-flex flex-wrap gap-5 justify-content-center">
        <FeaturedProduct></FeaturedProduct>
        <FeaturedProduct></FeaturedProduct>
        <FeaturedProduct></FeaturedProduct>
        <FeaturedProduct></FeaturedProduct>
      </div>
    </>
  );
}
