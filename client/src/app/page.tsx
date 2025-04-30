import BlogList from "@/components/blog/BlogList";
import HeroSection from "@/components/home/HeroSection";
import SearchBar from "@/components/home/Searchbar";
import { BlogListSkeleton } from "@/components/blog/Skeleton";
import { Suspense } from "react";


export default function Home({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";

  return (
    <div className="container mx-auto px-4 py-4">
      <HeroSection />
      <div className="my-8">
        <SearchBar initialSearch={search} />
      </div>
      <Suspense fallback={<BlogListSkeleton />}>
        <BlogList page={page} search={search} />
        <></>
      </Suspense>
    </div>
  );
}
