"use client";
import { Dispatch, FormEvent, SetStateAction } from "react";

export default function SearchInput({
  search,
  setSearch,
  getData,
  setHasMore,
  setCurrentPage,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  getData: () => Promise<void>;
  setHasMore: Dispatch<SetStateAction<boolean>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) {
  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasMore(true);
    setCurrentPage(2);
    getData();
  };
  return (
    <>
      <div className="mb-3 col-4">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Search Products"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </form>
      </div>
    </>
  );
}
