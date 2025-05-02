"use client";

import { Suspense, useState } from "react";
import { UserBlogListSkeleton } from "./Skeleton";
import UserBlogList from "./UserBlogList";

export default function UserBlogListWrapper() {
  const [page, setPage] = useState(1);
  return (
    <>
      <Suspense fallback={<UserBlogListSkeleton />}>
        <UserBlogList currentPage={page} setPage={setPage} />
      </Suspense>
    </>
  );
}
