"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/api/axios";
import { SignupFormData, SignUpResponse } from "@/types";
import { signupSchema } from "@/schemas/signup";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SignupPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await axios.post<SignUpResponse>("/auth/signup", data);
      toast.success("User Created!", {
        description: response.data.msg + " Please login to continue!",
      });
      reset();
      router.push("/login");
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err?.response?.data);
        toast.error("User not created!", {
          description:
            err?.response?.data?.error ||
            "Something went wrong while creating the user.",
        });
      }
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-slate-900">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-5 text-center">Signup</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-5 rounded-lg bg-white dark:bg-slate-800"
        >
          {/* Role Select */}
          <div>
            <Label className="block mb-1 font-medium">Role</Label>
            <Select
              onValueChange={(value) =>
                setValue("role", value as "doctor" | "client")
              } // Set value manually
              defaultValue=""
            >
              <SelectTrigger className="w-full p-2 border rounded-lg">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
              </SelectContent>
            </Select>{" "}
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          {/* First Name */}
          <div>
            <Label className="block mb-1 font-medium">First Name</Label>
            <Input
              type="text"
              {...register("first_name")}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your first name"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">
                {errors.first_name.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <Label className="block mb-1 font-medium">Last Name</Label>
            <Input
              type="text"
              {...register("last_name")}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your last name"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">{errors.last_name.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <Label className="block mb-1 font-medium">Address</Label>
            <Input
              type="text"
              {...register("address")}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          {/* Profile Description */}
          <div>
            <Label className="block mb-1 font-medium">
              Profile Description
            </Label>
            <textarea
              {...register("profile_desc")}
              className="w-full p-2 border rounded-lg"
              placeholder="Tell us about yourself (optional)"
            />
          </div>

          {/* Email */}
          <div>
            <Label className="block mb-1 font-medium">Email</Label>
            <Input
              type="email"
              {...register("email")}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label className="block mb-1 font-medium">Password</Label>
            <Input
              type="password"
              {...register("password")}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !isDirty || !isValid}
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
}
