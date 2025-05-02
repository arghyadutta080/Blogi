import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <div className="flex flex-col items-center space-y-6 max-w-md">
        <div className="rounded-full bg-muted p-6">
          <FileQuestion className="h-16 w-16 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Page not found
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/">Return to Home</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>

        <div className="mt-8 border-t pt-8 w-full">
          <p className="text-muted-foreground">
            Looking for something specific? Here are some helpful links:
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-center">
            <Link href="/" className="text-primary hover:underline">
              Latest Blog Posts
            </Link>
            <Link href="/login" className="text-primary hover:underline">
              Sign In
            </Link>
            <Link href="/register" className="text-primary hover:underline">
              Create an Account
            </Link>
            <Link href="/dashboard" className="text-primary hover:underline">
              Your Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
