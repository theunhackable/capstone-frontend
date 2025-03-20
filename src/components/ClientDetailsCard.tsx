"use client";
import useAxiosPrivate from "@/hooks/userAxiosPrivate";
import { User } from "@/types";
import React, { useEffect, useState } from "react";

type Props = {
  id: number;
};

export default function ClientDetailsCard({ id }: Props) {
  const [user, setUser] = useState<User>();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axiosPrivate.get<{ user: User }>(`/users/${id}`);
        console.log(res);
        setUser(res.data.user);
      } catch (e) {
        console.error(e);
      }
    }
    fetchUser();
  }, [axiosPrivate, id]);
  if (!user) return null;
  return (
    <div className="border rounded-lg p-4 shadow-md bg-gray-50">
      <h2 className="text-lg font-bold mb-2">
        👤 {user.role === "client" && "Client"}
        {user.role === "doctor" && "Doctor"} Details
      </h2>
      <p>
        <strong>Name:</strong> {user.first_name} {user.last_name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Address:</strong> {user.address}
      </p>
      <p>
        <strong>Profile:</strong> {user.profile_desc}
      </p>
    </div>
  );
}
