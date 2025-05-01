"use client";

import { getCurrentUser } from "@/api/auth";
import { useUserStore } from "@/lib/store/user";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (user) return;

    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser({ id: user?.id, username: user?.username });
      } catch (error: any) {
        console.log(error);
        setUser(null);
        // if pathname isn't "/" then push only
        router.push("/");
      }
    };

    fetchUser();
  }, [user, setUser]);

  return <>{children}</>;
};

export default AuthLoader;
