"use client";
import useAuthStore from "@/store/authStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function UserPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.role) {
      router.push("/auth/login");
    } else {
      switch (user.role) {
        case "client":
          router.push("/user/client");
          break;
        case "doctor":
          router.push("/user/doctor");
          break;
        case "admin":
          router.push("/user/admin");
          break;
        default:
          router.push("/auth/login");
      }
    }
  }, [user, router]);

  return <div>Redirecting...</div>;
}

export default UserPage;
