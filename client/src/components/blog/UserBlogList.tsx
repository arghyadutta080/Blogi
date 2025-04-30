"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { BlogPost } from "@/lib/types/blog";
import { toast } from "@/hooks/use-toast";
import { deleteBlogPost } from "@/api/post";
import Pagination from "../common/Pagination";

interface UserBlogListProps {
  posts: BlogPost[];
  total: number;
  currentPage?: number;
  limit?: number;
}

export default function UserBlogList({
  posts,
  total,
  currentPage = 1,
  limit = 6,
}: UserBlogListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const totalPages = Math.ceil(total / limit);

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No blog posts yet</h2>
        <p className="text-muted-foreground mb-6">
          You haven&apos;t created any blog posts yet. Start writing your first
          post!
        </p>
        <Link href="/create">
          <Button>Create Your First Post</Button>
        </Link>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteBlogPost(id);
      toast({
        title: "Post deleted",
        description: "Your blog post has been deleted successfully.",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.post.id} className="overflow-hidden">
          <div className="aspect-video overflow-hidden">
            <img
              src={post.post.image_url || ""}
              alt={post.post.title}
              className="h-full w-full object-cover"
              width={400}
              height={200}
            />
          </div>
          <CardHeader className="p-4">
            <CardTitle className="line-clamp-1">{post.post.title}</CardTitle>
            <CardDescription>
              Created on {formatDate(post.post.created_at)}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {post.post.content.substring(0, 100)}...
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/blog/${post.post.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                View
              </Link>
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/edit/${post.post.id}`}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your blog post.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(post.post.id.toString())}
                      disabled={deletingId === post.post.id.toString()}
                    >
                      {deletingId === post.post.id.toString()
                        ? "Deleting..."
                        : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardFooter>
        </Card>
      ))}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
