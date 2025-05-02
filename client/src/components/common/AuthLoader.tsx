"use client";

import React, { useEffect } from "react";
import { getCurrentUser } from "@/api/auth";
import { useUserStore } from "@/lib/store/user";

const AuthLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (user) return;

    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser({ id: user?.id, username: user?.username });
      } catch (error: any) {
        console.log(error);
        setUser(null);
      }
    };

    fetchUser();
  }, [user, setUser]);

  return <>{children}</>;
};

export default AuthLoader;
