import ProductCard from "@/components/ProductCard";
import SearchInput from "@/components/SearchInput";

export default function HeadsetsProductPage() {
  return (
    <>
      <h1 className="display-2 text-center">Headset PAGE</h1>
      <div className="container">
        <SearchInput></SearchInput>
        <div className="row gap-5">
          <ProductCard></ProductCard>
        </div>
      </div>
    </>
  );
}
