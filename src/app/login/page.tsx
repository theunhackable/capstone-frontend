"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthData, LoginFormValues } from "@/types";
import { loginSchema } from "@/schemas/login";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "@/api/axios";
import useAuthStore from "@/store/authStore";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  useEffect(() => {
    setMounted(true);
    const refresh_token = localStorage.getItem("refreshToken");
    if (refresh_token) {
      router.push("/user");
    }
    return () => {
      setMounted(false);
    };
  }, [router, setMounted]);

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Form Data:", data);
    try {
      const res = await axios.post<AuthData>("/auth/login", data);
      const { refresh_token, access_token, user } = res.data;
      setAuth({
        refresh_token,
        access_token,
        user,
      });
      toast.success("Login success!", {
        description: `Welcome ${user?.first_name} ${user?.last_name}`,
      });
      reset();
      router.push("/user");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.status === 401) {
          toast.error("Login Failed!", {
            description: error.response.data.error || "Invalid credentials",
          });
        }
      }
      console.error("Error:", error);
    }
  };
  if (!mounted) return null;
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-slate-900">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email Input */}
          <div>
            <Label htmlFor="email" className="block font-medium mb-1">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500`}
              placeholder="Enter your email"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <Label htmlFor="password" className="block font-medium mb-1">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500`}
              placeholder="Enter your password"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !isDirty || !isValid}
            className="w-full bg-sky-500 text-white py-2 rounded-lg
            hover:bg-sky-600 hover:cursor-pointer disabled:cursor-not-allowed
            transition duration-300 disabled:bg-gray-400"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Additional Links */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
          Do not have an account?&nbsp;
          <Link href="/signup" className="text-sky-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
