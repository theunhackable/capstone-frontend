import React from "react";
import { User } from "@/types";
import CreateAppointmentDialog from "./DatePicker";
type DoctorProps = {
  doctor: User;
};

export default function DoctorCard({ doctor }: DoctorProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md ">
      <h3 className="text-lg font-semibold">
        {doctor.first_name} {doctor.last_name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Specialization: {doctor.profile_desc}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Location: {doctor.address}
      </p>
      <CreateAppointmentDialog doctorId={doctor.id} />
    </div>
  );
}
