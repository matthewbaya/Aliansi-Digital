"use client";
import ProductCard from "@/components/ProductCard";
import SearchInput from "@/components/SearchInput";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ProductPage() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(2);
  const [search, setSearch] = useState("");

  // async function getProducts() {
  //   const res = await fetch("http://localhost:3000/api/products", {
  //     cache: "no-store",
  //   });
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch data");
  //   }

  //   const productsData = await res.json();
  //   setProducts(productsData);
  // }
  async function getData() {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/api/pagination?searchQuery=${search}&pageNumber=1`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const { data } = await res.json();
    console.log(data);
    setItems(data);
  }

  useEffect(() => {
    getData();
  }, []);

  async function fetchProduct() {
    // console.log(hasMore);
    // console.log(currentPage);
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/api/pagination?searchQuery=${search}&pageNumber=${currentPage}`,
      {
        cache: "no-store",
      }
    );
    const { data } = await res.json();
    return data;
  }

  const fetchData = async () => {
    const moreProduct: never[] = await fetchProduct();

    setItems([...items, ...moreProduct]);

    if (moreProduct.length === 0 || moreProduct.length < 8) {
      setHasMore(false);
    }

    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <h1 className="display-2 text-center">All Products</h1>
      <div className="container">
        <div className="d-flex flex-column align-items-center">
          <SearchInput
            search={search}
            setSearch={setSearch}
            getData={getData}
            setHasMore={setHasMore}
            setCurrentPage={setCurrentPage}
          ></SearchInput>

          <InfiniteScroll
            dataLength={items.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h1>Loading more data...</h1>}
            endMessage={
              <p className="text-center">
                <b>That is all we got for now!</b>
              </p>
            }
          >
            <div className="row gap-5 justify-content-around">
              {items.map((product, id) => {
                return <ProductCard key={id} product={product}></ProductCard>;
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}
