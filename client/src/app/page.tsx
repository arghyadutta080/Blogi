// import BlogList from "@/components/blog/BlogList";
import HeroSection from "@/components/home/HeroSection";
// import SearchBar from "@/components/home/Searchbar";
// import { BlogListSkeleton } from "@/components/blog/Skeleton";
// import { Suspense } from "react";
import Blogs from "@/components/home/Blogs";

export default function Home() {

  return (
    <div className="container mx-auto px-4 py-4">
      <HeroSection />
      <Blogs />
    </div>
  );
}
