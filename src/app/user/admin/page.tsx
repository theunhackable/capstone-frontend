"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import useAxiosPrivate from "@/hooks/userAxiosPrivate";
import ConfirmActionDialog from "@/components/BlockUserDialouge";
import { User } from "@/types";
// Main Page Component
export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [doctors, setDoctors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  // Fetch users and doctors

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const users = await axiosPrivate.get<{ users: User[] }>("/users/"); // API to fetch all users
        const doctors = await axiosPrivate.get<{ doctors: User[] }>(
          "/users/doctors",
        );

        // Split data into Users and Doctors
        setUsers(users.data.users);
        setDoctors(doctors.data.doctors);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [axiosPrivate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-8">
        User & Doctor Management
      </h1>

      {/* Users Table */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Users 👥</h2>
        <Table className="w-full border">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell
                  className={`${
                    user.blocked ? "text-red-500" : "text-green-500"
                  } font-semibold`}
                >
                  {user.blocked ? "Blocked" : "Active"}
                </TableCell>
                <TableCell>
                  <ConfirmActionDialog user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Doctors Table */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Doctors 🩺</h2>
        <Table className="w-full border">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>{doctor.id}</TableCell>
                <TableCell>
                  {doctor.first_name} {doctor.last_name}
                </TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell
                  className={`${
                    doctor.blocked ? "text-red-500" : "text-green-500"
                  } font-semibold`}
                >
                  {doctor.blocked ? "Blocked" : "Active"}
                </TableCell>
                <TableCell>
                  <ConfirmActionDialog user={doctor} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
