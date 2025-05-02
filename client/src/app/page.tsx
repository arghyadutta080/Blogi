import HeroSection from "@/components/home/HeroSection";
import Blogs from "@/components/home/Blogs";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-4">
      <HeroSection />
      <Blogs />
    </div>
  );
}
