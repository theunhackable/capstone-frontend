"use client";
import { useEffect, useState } from "react";
import AppointmentCard from "@/components/AppointmentCard";
import useAxiosPrivate from "@/hooks/userAxiosPrivate";
import useAuthStore from "@/store/authStore";
import Link from "next/link";
import { AppointmentData } from "@/types";

export default function DoctorDashboard() {
  const { access_token } = useAuthStore();
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const res =
          (await axiosPrivate.get<AppointmentData[]>("/appointments/")) || [];
        setAppointments(res.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== "undefined") getAppointments();
  }, [access_token, axiosPrivate]);

  // Show only first 10 appointments for doctors
  const limitedAppointments = appointments.slice(0, 10);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-5">
        Upcoming Appointments for Your Patients 🩺
      </h1>

      {loading ? (
        <p className="text-center mt-5">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <div className="text-center mt-5 space-y-4">
          <p className="text-gray-500">No appointments found.</p>
        </div>
      ) : (
        <>
          {/* Show first 10 appointments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {limitedAppointments.map((appointment) => (
              <Link
                key={appointment.id}
                href={`/appointments/${appointment.id}`}
              >
                <AppointmentCard appointment={appointment} />
              </Link>
            ))}
          </div>

          {/* Show All Appointments Button */}
          <div className="flex justify-center mt-5">
            <Link
              className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-white"
              href="/appointments"
            >
              📚 Show All Appointments
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
