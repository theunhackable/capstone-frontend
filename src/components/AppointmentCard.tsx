"use client";
import useAxiosPrivate from "@/hooks/userAxiosPrivate";
import { cn } from "@/lib/utils";
import { AppointmentData, User } from "@/types";
import React, { useEffect, useState } from "react";

export default function AppointmentCard({
  appointment,
}: {
  appointment: AppointmentData;
}) {
  const axiosPrivate = useAxiosPrivate();
  const [doctor, setDoctor] = useState<User>();
  const dateObject = new Date(appointment.date_time);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  useEffect(() => {
    const controller = new AbortController();
    async function fetchDoctor() {
      try {
        const res = await axiosPrivate.get<{ user: User }>(
          `/users/${appointment.doctor_id}`,
          {
            signal: controller.signal,
          },
        );
        console.log(res.data);
        setDoctor(res.data.user);
      } catch (e) {
        console.log(e);
      }
    }

    fetchDoctor();
    return () => {
      controller.abort();
    };
  }, [appointment.doctor_id, axiosPrivate]);
  return (
    <div className="border p-4 rounded-lg shadow-md ">
      {doctor && (
        <h3 className="font-bold text-xl">
          Doctor: {doctor?.first_name} {doctor?.last_name}
        </h3>
      )}
      <p className="text-sm text-gray-500">
        Date: {day}/{month < 10 ? "0" + month : month}/{year}
      </p>
      <p className="text-sm text-gray-500">
        Time: {`${hours}:${minutes < 10 ? "0" + minutes : minutes}`}
      </p>
      <p
        className={cn("text-sm", {
          "text-green-500": appointment.status === "on-going",
          "text-red-500": appointment.status === "canceled",
          "text-blue-500": appointment.status === "up-coming",
        })}
      >
        Status: {appointment.status}
      </p>
      <p>Desc: {appointment.client_requirements}</p>
    </div>
  );
}
