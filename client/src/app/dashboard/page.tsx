import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { UserBlogListSkeleton } from "@/components/blog/Skeleton";
import UserBlogList from "@/components/blog/UserBlogList";
import { getAllUserPosts } from "@/api/post";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export const metadata = {
  title: "Dashboard - Blogi",
  description: "Manage your blog posts",
};

export default async function DashboardPage({ searchParams }: PageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Blog Posts</h1>
        <Link href="/create">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Create New Post
          </Button>
        </Link>
      </div>

      <Suspense fallback={<UserBlogListSkeleton />}>
        <UserBlogListWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function UserBlogListWrapper({
  searchParams,
}: {
  searchParams: PageProps["searchParams"];
}) {
  const page = parseInt(searchParams.page || "1");
  const limit = 6;
  const { posts, total } = await getAllUserPosts();
  return (
    <UserBlogList
      posts={posts}
      total={total}
      currentPage={page}
      limit={limit}
    />
  );
}
