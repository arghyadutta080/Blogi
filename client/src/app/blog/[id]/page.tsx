/* eslint-disable @typescript-eslint/no-unused-vars */
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/api/post";
import { BlogDetailSkeleton } from "@/components/blog/Skeleton";
import BlogDetail from "@/components/blog/BlogDetail";

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const post = await getBlogPost(params.id);
    return {
      title: `${post.post.title} - Blogi`,
      description: post.post.content.substring(0, 160),
    };
  } catch (error: any) {
    return {
      title: "Blog Post - Blogi",
      description: "View blog post details",
    };
  }
}

export default function BlogPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<BlogDetailSkeleton />}>
        <BlogDetailWrapper id={params.id} />
      </Suspense>
    </div>
  );
}

async function BlogDetailWrapper({ id }: { id: string }) {
  try {
    const post = await getBlogPost(id);
    return <BlogDetail post={post} />;
  } catch (error) {
    notFound();
  }
}
