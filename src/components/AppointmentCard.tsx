"use client";
import useAxiosPrivate from "@/hooks/userAxiosPrivate";
import { cn } from "@/lib/utils";
import { AppointmentData, AppointmentStatus, User } from "@/types";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function AppointmentCard({
  appointment,
}: {
  appointment: AppointmentData;
}) {
  const axiosPrivate = useAxiosPrivate();
  const [doctor, setDoctor] = useState<User>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>(appointment.status);

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

  const handleStatusChange = async () => {
    try {
      await axiosPrivate.put(`/appointments/status/${appointment.id}`, {
        ...appointment,
        status: newStatus,
      });
      appointment.status = newStatus as "up-coming" | "on-going" | "canceled";
      setIsDialogOpen(false);
      toast.success("Success!", {
        description: `Status updated to: ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md">
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
        className={cn("text-sm mb-2", {
          "text-green-500":
            appointment.status === ("on-going" as AppointmentStatus),
          "text-red-500":
            appointment.status === ("canceled" as AppointmentStatus),
          "text-blue-500":
            appointment.status === ("up-coming" as AppointmentStatus),
          "text-yellow-500":
            appointment.status === ("pending" as AppointmentStatus),
          "text-purple-500":
            appointment.status === ("completed" as AppointmentStatus),
          "text-orange-500":
            appointment.status === ("rescheduled" as AppointmentStatus),
          "text-gray-500":
            appointment.status === ("expired" as AppointmentStatus),
        })}
      >
        Status: {appointment.status}
      </p>
      <p>Desc: {appointment.client_requirements}</p>

      {/* Status Update Button */}

      {appointment && (
        <div className="mt-4">
          {/* Hide button if status is canceled or completed */}
          {appointment.status !== "canceled" &&
            appointment.status !== "completed" && (
              <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                Change Status
              </Button>
            )}
        </div>
      )}

      {/* Status Update Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Appointment Status</DialogTitle>
          </DialogHeader>
          <Select value={newStatus} onValueChange={setNewStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status">{newStatus}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="on-going">On-going</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleStatusChange}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
