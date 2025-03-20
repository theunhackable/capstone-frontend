"use client";
import { useEffect, useState } from "react";
import AppointmentCard from "@/components/AppointmentCard";
import useAxiosPrivate from "@/hooks/userAxiosPrivate";
import useAuthStore from "@/store/authStore";
import { AppointmentData } from "@/types";
import { toast } from "sonner";
import Link from "next/link";

export default function AppointmentsPage() {
  const { user, access_token } = useAuthStore();
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const res =
          (await axiosPrivate.get<AppointmentData[]>("/appointments/")) || [];
        const allAppointments = res.data;

        // Filter appointments by user_id matching the logged-in client
        const clientAppointments = allAppointments.filter(
          (appointment) => appointment.user_id === user?.id,
        );

        setAppointments(clientAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== "undefined") getAppointments();
  }, [access_token, axiosPrivate, user]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-5">
        Your Appointments 📚
      </h1>
      <div className="flex justify-center mb-5">
        <Link
          className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white inline-block"
          href="/user/doctor/search"
        >
          🔍 Search for Doctors
        </Link>
      </div>
      {loading ? (
        <p className="text-center mt-5">Loading your appointments...</p>
      ) : appointments.length === 0 ? (
        <div className="text-center mt-5 space-y-4">
          <p className="text-gray-500">
            No appointments found for your account.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </div>
  );
}
