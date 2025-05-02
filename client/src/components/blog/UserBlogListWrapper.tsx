"use client";

import { Suspense, useEffect, useState } from "react";
import { UserBlogListSkeleton } from "./Skeleton";
import UserBlogList from "./UserBlogList";
import { useRouter } from "next/navigation";

export default function UserBlogListWrapper() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard");
  }, [])
  return (
    <>
      <Suspense fallback={<UserBlogListSkeleton />}>
        <UserBlogList currentPage={page} setPage={setPage} />
      </Suspense>
    </>
  );
}
