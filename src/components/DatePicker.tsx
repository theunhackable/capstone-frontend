"use client";
import * as React from "react";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { format } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAuthStore from "@/store/authStore";
import useAxiosPrivate from "@/hooks/userAxiosPrivate";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// ✅ Zod Schema
const appointmentSchema = z.object({
  date: z.date({
    required_error: "Date is required.",
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Invalid time format (HH:mm)",
  }),
  client_requirements: z.string().min(5, {
    message: "Requirements must be at least 5 characters.",
  }),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export default function CreateAppointmentDialog({
  doctorId,
}: {
  doctorId: number;
}) {
  const { user } = useAuthStore();
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const axiosPrivate = useAxiosPrivate();
  // ✅ Form Setup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = async (data: AppointmentFormValues) => {
    try {
      const formattedDateTime = `${format(selectedDate as Date, "yyyy-MM-dd")}T${data.time}`;
      const payload = {
        user_id: user?.id,
        doctor_id: doctorId,
        date_time: formattedDateTime,
        client_requirements: data.client_requirements,
      };

      // ✅ Send the appointment request
      await axiosPrivate.post("/appointments/", payload);
      toast.success("Appointment created successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("Failed to create appointment.");
    }
  };
  if (!user) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Book Appointment</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Appointment</DialogTitle>
        </DialogHeader>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 📅 Date Picker */}
          <div className="flex flex-col space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    if (date) setValue("date", date);
                  }}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>

          {/* ⏰ Time Input */}
          <div className="flex flex-col space-y-2">
            <Label>Time (24h format)</Label>
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-4 w-4" />
              <Input type="time" {...register("time")} placeholder="HH:mm" />
            </div>
            {errors.time && (
              <p className="text-red-500 text-sm">{errors.time.message}</p>
            )}
          </div>

          {/* 📝 Client Requirements */}
          <div className="flex flex-col space-y-2">
            <Label>Requirements</Label>
            <Input
              {...register("client_requirements")}
              placeholder="Briefly describe your requirements"
            />
            {errors.client_requirements && (
              <p className="text-red-500 text-sm">
                {errors.client_requirements.message}
              </p>
            )}
          </div>

          {/* ✅ Submit Button */}
          <Button type="submit" className="w-full">
            Confirm Appointment
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
