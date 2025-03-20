"use client";
import React, { useState } from "react";
import Link from "next/link";
import useAuthStore from "@/store/authStore";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const routesForClient = [
  { path: "/user", label: "User Dashboard" },
  { path: "/user/doctor/search", label: "Search Doctor" },
  { path: "/appointments", label: "Appointments" },
];

const routesForDoctor = [
  { path: "/user", label: "User Dashboard" },
  { path: "/appointments", label: "Appointments" },
];

const routesForGuest = [
  { path: "/", label: "Home" },
  { path: "/login", label: "Sign In" },
  { path: "/signup", label: "Sign Up" },
];

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore(); // Get role from auth store
  // Set routes based on user role
  const routes = user
    ? user.role === "client"
      ? routesForClient
      : routesForDoctor
    : routesForGuest;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* Button to open the menu */}
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center w-fit space-x-2 p-2"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      {/* Slide Menu Content */}
      <SheetContent side="right" className="w-72  p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Navigation</h2>
          <SheetClose asChild></SheetClose>
        </div>

        {/* Links for navigation */}
        <nav className="flex flex-col space-y-3">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="text-blue-500 hover:underline text-lg"
              onClick={() => setIsOpen(false)}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
