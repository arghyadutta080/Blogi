"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllBlogPosts } from "@/api/post";
import BlogCard from "./BlogCard";
import Pagination from "../common/Pagination";
import { BlogPost } from "@/lib/types/blog";
import { PAGINATION_LIMIT } from "@/lib/constants";
import { BlogListSkeleton } from "./Skeleton";

export default function BlogList({
  currentPage = 1,
  search = "",
  setPage,
}: {
  currentPage?: number;
  search?: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const limit = PAGINATION_LIMIT;
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { posts, total } = await getAllBlogPosts({
          page: currentPage,
          limit,
          search,
        });
        setPosts(posts);
        setTotalPages(Math.ceil(total / limit));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentPage, search]);

  if (posts.length === 0) {
    if (loading) {
      return <BlogListSkeleton />;
    }
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No blog posts found</h2>
        {search && (
          <p className="text-muted-foreground">
            No results for &quot;{search}&quot;. Try a different search term.
          </p>
        )}
        {!search && (
          <p className="text-muted-foreground">
            There are no blog posts yet. Be the first to create one!
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: BlogPost) => (
          <Link key={post.post.id} href={`/blog/${post.post.id}`}>
            <BlogCard post={post} />
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          search={search}
          setPage={setPage}
        />
      )}
    </div>
  );
}
