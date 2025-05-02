"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUserStore } from "@/lib/store/user";

export default function HeroSection() {
  const { user } = useUserStore();
  return (
    <div className="relative py-12 md:py-16 overflow-hidden rounded-lg bg-muted">
      <div className="container px-4 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Share Your Stories with the World
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Blogi is a modern platform for writers and readers to connect
                through engaging content.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href={user ? "/dashboard" : "/register"}>
                <Button size="lg" className="w-full min-[400px]:w-auto">
                  Get Started
                </Button>
              </Link>
              {!user && (
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full min-[400px]:w-auto"
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <div className="hidden lg:block">
            <Image
              src="/images/hero.jpg"
              alt="Hero Image"
              width={550}
              height={650}
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
