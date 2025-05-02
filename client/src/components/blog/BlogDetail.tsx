"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";
import { Button } from "@/components/ui/button";
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
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pencil, Trash2 } from "lucide-react";
import type { BlogPost } from "@/lib/types/blog";
import Image from "next/image";
import { useUserStore } from "@/lib/store/user";
import { deleteBlogPost } from "@/api/post";

interface BlogDetailProps {
  post: BlogPost;
}

export default function BlogDetail({ post }: BlogDetailProps) {
  const { user } = useUserStore();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const isAuthor = user && user.id == post.author.id.toString();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteBlogPost(post.post.id.toString());
      toast({
        title: "Post deleted",
        description: "Your blog post has been deleted successfully.",
      });
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error deleting blog post:", error);
      toast({
        title: "Error",
        description: "Failed to delete the blog post. Please try again.",
        variant: "destructive",
      });
      setIsDeleting(false);
    }
  };

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="aspect-video overflow-hidden rounded-lg mb-6">
          <Image
            src={post.post.image_url || ""}
            alt={post.post.title}
            className="h-full w-full object-cover"
            width={1000}
            height={500}
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">{post.post.title}</h1>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback>
                {post.author.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author.username}</p>
              <time
                className="text-sm text-muted-foreground"
                dateTime={post.post.created_at}
              >
                {formatDate(post.post.created_at)}
              </time>
            </div>
          </div>

          {isAuthor && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/edit/${post.post.id}`)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
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
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>

      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.post.content }}
      />
    </article>
  );
}
