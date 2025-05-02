"use client";

import React, { Suspense, useState } from "react";
import SearchBar from "./Searchbar";
import { BlogListSkeleton } from "../blog/Skeleton";
import BlogList from "../blog/BlogList";

const Blogs = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="my-8">
        <SearchBar initialSearch={search} setSearch={setSearch} setPage={setPage}/>
      </div>
      <Suspense fallback={<BlogListSkeleton />}>
        <BlogList currentPage={page} setPage={setPage} search={search} />
      </Suspense>
    </>
  );
};

export default Blogs;
