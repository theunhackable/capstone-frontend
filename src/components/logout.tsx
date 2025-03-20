"use client";

import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Logout() {
  const { user, logout } = useAuthStore();
  const [mounted, setMounted] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, [setMounted]);

  const onSubmit = () => {
    console.log("logging out...");
    logout();
    router.push("/login");
  };
  if (!mounted) {
    return null;
  }
  if (!user) {
    return null;
  }

  return (
    <Button className="hover:cursor-pointer" onClick={onSubmit}>
      Log out
    </Button>
  );
}
