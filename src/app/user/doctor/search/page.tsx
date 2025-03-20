"use client";
import { useState, useEffect, ChangeEvent } from "react";

import DoctorCard from "@/components/DoctorCard";
import { User } from "@/types";
import useAxiosPrivate from "@/hooks/userAxiosPrivate";

export default function SearchDoctorPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [doctors, setDoctors] = useState<User[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const axiosPrivate = useAxiosPrivate();
  // Fetch all doctors from API

  // Handle search input change
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter doctors by first name or last name
    const filteredResults = doctors.filter(
      (doctor) =>
        doctor.first_name.toLowerCase().includes(query) ||
        doctor.last_name.toLowerCase().includes(query),
    );
    setFilteredDoctors(filteredResults);
  };

  // Fetch doctors on initial load
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const res = await axiosPrivate.get<{ doctors: User[] }>(
          "/users/doctors",
        );
        console.log("doctors data", res);
        setDoctors(res.data.doctors);
        setFilteredDoctors(res.data.doctors); // Set filtered doctors initially
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [axiosPrivate]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-5">
        🔍 Search for Doctors
      </h1>

      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by first or last name..."
        className="w-full p-2 mb-5 border rounded-lg"
      />

      {/* Show loading if fetching data */}
      {loading ? (
        <p className="text-center text-gray-500">Loading doctors...</p>
      ) : filteredDoctors.length === 0 ? (
        <p className="text-center text-gray-500">No doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDoctors.length ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <p> No doctors found</p>
          )}
        </div>
      )}
    </div>
  );
}
