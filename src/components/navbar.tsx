"use client";
import { Stethoscope } from "lucide-react";
import React, { useEffect } from "react";
import ModeToggle from "@/components/theme-switcher";
import dynamic from "next/dynamic";
import SidebarMenu from "./SidebarMenu";
import Link from "next/link";

// Dynamically import UserAvatar to avoid SSR mismatches
const UserAvatar = dynamic(() => import("@/components/UserManager"), {
  ssr: false,
});
export default function Navbar() {
  useEffect(() => {
    async function fetchdata() {
      try {
        const res = await fetch("http://localhost:5000/");
        const body = await res.json();
        console.log(body);
      } catch (e) {
        console.error(e);
      }
    }
    fetchdata();
  }, []);
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg py-5 px-10 border-b">
      <header className=" flex items-center justify-between gap-4">
        <Link href="/" className="flex gap-4 items-center justify-between">
          <Stethoscope className="text-sky-500" />
          <span className="text-xl font-semibold">Doctor Online</span>
        </Link>
        <div className="flex items-center gap-5">
          <UserAvatar />
          <SidebarMenu />
          <ModeToggle />
        </div>
      </header>
    </nav>
  );
}
