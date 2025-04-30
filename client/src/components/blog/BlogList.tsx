import { getAllBlogPosts } from "@/api/post";
import Link from "next/link";
import BlogCard from "./BlogCard";
import Pagination from "../common/Pagination";
import { BlogPost } from "@/lib/types/blog";

export default async function BlogList({
  page = 1,
  search = "",
}: {
  page?: number;
  search?: string;
}) {
  const limit = 6;
  const { posts, total } = await getAllBlogPosts({ page, limit, search });
  const totalPages = Math.ceil(total / limit);

  if (posts.length === 0) {
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
          currentPage={page}
          totalPages={totalPages}
          search={search}
        />
      )}
    </div>
  );
}
