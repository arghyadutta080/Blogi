import BlogEditor from "@/components/blog/BlogEditor";

export const metadata = {
  title: "Create Blog Post - Blogi",
  description: "Create a new blog post",
};

export default async function CreateBlogPage() {

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
      <BlogEditor />
    </div>
  );
}
