"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAuthStore from "@/store/authStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const router = useRouter();
  const { refresh_token } = useAuthStore();
  useEffect(() => {
    if (!refresh_token) {
      toast.warning("You are not logged in. Please try logging in.");
      router.push("/login");
    } else {
      setIsAuthChecked(true);
    }
  }, [router, refresh_token]);

  if (!isAuthChecked) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
