"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useUserStore } from "@/lib/store/user";
import { logoutUser } from "@/api/auth";
import { toast } from "@/hooks/use-toast";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  const { user, setUser } = useUserStore();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/");
      setUser(null);
      toast({
        title: "Logout successful",
        description: "You have been logged out successfully.",
        variant: "destructive",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4 px-6">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl">Blogi</span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {user && (
                //   {(
                <NavigationMenuItem>
                  <Link href="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          {/* <ThemeToggle /> */}
          <ThemeSwitch/>
          <div className="hidden md:flex">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">Hello, {user.username}</span>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 py-4">
                <Link
                  href="/"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/" ? "text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === "/dashboard"
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === "/login"
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === "/register"
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
