"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useAxiosPrivate from "@/hooks/userAxiosPrivate";
import AppointmentCard from "@/components/AppointmentCard";
import ClientDetailsCard from "@/components/ClientDetailsCard";
import { AppointmentData, User } from "@/types";
import Link from "next/link";

export default function AppointmentDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<{
    doctor: User | null;
    client: User | null;
    appointment: AppointmentData | null;
  }>({ doctor: null, client: null, appointment: null });
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchDetails = async (id: string) => {
      try {
        // Fetch appointment details by ID
        const appointmentRes = await axiosPrivate.get<{
          appointment: AppointmentData;
        }>(`/appointments/${id}`);

        const appointment = appointmentRes.data.appointment;

        // Set appointment data in state
        setData((prev) => ({
          ...prev,
          appointment,
        }));

        if (appointment && appointment.user_id) {
          console.log("Appointment Data:", appointment); // Debugging
          const clientRes = await axiosPrivate.get<User>(
            `/users/${appointment.user_id}`,
          );
          setData((prev) => ({ ...prev, client: clientRes.data }));
        } else {
          console.error("user_id is undefined in the response.");
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== "undefined" && id) {
      fetchDetails(id);
    }
  }, [id, axiosPrivate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading appointment details...</p>
      </div>
    );
  }

  if (!data.appointment || !data.client) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500">
          Error fetching details. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-5">
        Appointment Details 📝
      </h1>
      <Link
        className="text-center block text-sky-500 underline mb-4"
        href="/appointments"
      >
        See all the appointments
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AppointmentCard appointment={data.appointment} />
        <ClientDetailsCard id={data.appointment.user_id} />
      </div>
    </div>
  );
}
