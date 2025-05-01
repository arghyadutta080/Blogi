"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost, updateBlogPost } from "@/api/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload } from "lucide-react";
import { Post } from "@/lib/types/blog";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

interface BlogEditorProps {
  post?: Post;
}

export default function BlogEditor({ post }: BlogEditorProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState(
    post?.image_url || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  if (coverImage) {
    formData.append("image", coverImage);
  }

  const router = useRouter();
  const isEditing = !!post;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEditing) {
        await updateBlogPost(post.id.toString(), formData);
        toast({
          title: "Blog post updated",
          description: "Your blog post has been updated successfully.",
        });
      } else {
        await createBlogPost(formData);
        toast({
          title: "Blog post created",
          description: "Your blog post has been created successfully.",
        });
      }
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to ${
          isEditing ? "update" : "create"
        } the blog post. Please try again.`,
        variant: "destructive",
      });
      console.log("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your blog post title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        {/* need to replace with react-quill text area */}
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog post content here..."
          className="min-h-[300px]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image</Label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("coverImage")?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            {coverImagePreview ? "Change Image" : "Upload Image"}
          </Button>
          <Input
            id="coverImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {coverImagePreview && (
            <span className="text-sm text-muted-foreground">
              Image selected
            </span>
          )}
        </div>

        {coverImagePreview && (
          <div className="mt-4 aspect-video w-full max-w-md overflow-hidden rounded-md border">
            <Image
              src={coverImagePreview || ""}
              alt="Cover preview"
              className="h-full w-full object-cover"
              width={500}
              height={300}
            />
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? "Updating..." : "Creating..."}
            </>
          ) : isEditing ? (
            "Update Post"
          ) : (
            "Create Post"
          )}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
