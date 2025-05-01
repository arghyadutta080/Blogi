import { notFound } from "next/navigation";
import { getBlogPost } from "@/api/post";
import BlogEditor from "@/components/blog/BlogEditor";

export const metadata = {
  title: "Edit Blog Post - Blogi",
  description: "Edit your blog post",
};

export default async function EditBlogPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const post = await getBlogPost(params.id);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>
        <BlogEditor post={post.post} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }
}
