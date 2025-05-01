import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import UserBlogListWrapper from "@/components/blog/UserBlogListWrapper";


export const metadata = {
  title: "Dashboard - Blogi",
  description: "Manage your blog posts",
};

export default async function DashboardPage() {
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
      <UserBlogListWrapper />
    </div>
  );
}
