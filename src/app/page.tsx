"use client";
import {
  CalendarCheck,
  Search,
  ShieldCheck,
  UserCheck,
  Stethoscope,
  FileText,
  PhoneCall,
  MapPin,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-32 items-center justify-center sm:items-start">
        {/* Hero Section */}
        <section
          id="hero"
          className="container flex flex-col items-center justify-center h-96 text-center"
        >
          <h1 className="font-bold text-4xl leading-snug">
            Book Your Appointment <br />
            <span className="text-sky-500">With Ease</span>
          </h1>
          <p className="italic mt-3  text-lg text-gray-600 dark:text-gray-300">
            Find the best doctors and book hassle-free appointments instantly.
          </p>
          <div className="mt-5 flex gap-4">
            <button className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition duration-300">
              <Search size={18} />
              Search Doctors
            </button>
            <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
              <CalendarCheck size={18} />
              Book Appointment
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container  mt-10">
          <div className="text-center mb-3">
            <h2 className="text-3xl font-bold">Features</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300 italic ">
              Simple features to get an appointment
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="flex flex-col items-center text-center p-5 border rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <Search size={32} className="text-sky-500" />
              <h3 className="mt-3 text-xl font-bold">Search Doctors</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Find top-rated doctors by specialty.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-5 border rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <CalendarCheck size={32} className="text-green-500" />
              <h3 className="mt-3 text-xl font-bold">Easy Scheduling</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Book appointments at your convenience.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-5 border rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <ShieldCheck size={32} className="text-yellow-500" />
              <h3 className="mt-3 text-xl font-bold">Secure Records</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Keep medical records secure and safe.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="container mt-10 text-center">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 italic">
            Get started in just 3 easy steps.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
            <div className="flex flex-col items-center text-center p-5 border rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <UserCheck size={32} className="text-indigo-500" />
              <h3 className="mt-3 text-lg font-bold">Sign Up or Log In</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Create your account in minutes.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-5 border rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <Stethoscope size={32} className="text-red-500" />
              <h3 className="mt-3 text-lg font-bold">Choose a Doctor</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Browse and select the best doctor.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-5 border rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <CalendarCheck size={32} className="text-green-500" />
              <h3 className="mt-3 text-lg font-bold">Book Your Slot</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Schedule an appointment quickly.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact-us" className="container mt-10 text-center">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            We’re here to help you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 mt-5 justify-center">
            <div className="flex items-center gap-2">
              <PhoneCall size={20} className="text-blue-500" />
              <p className="text-gray-600 dark:text-gray-300">
                +1 (800) 123-4567
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-green-500" />
              <p className="text-gray-600 dark:text-gray-300">
                support@doctorcare.com
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-red-500" />
              <p className="text-gray-600 dark:text-gray-300">
                123 Main Street, NY, USA
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="mt-10 p-5 bg-gray-100 text-center">
        <p className="text-sm text-gray-500">
          &copy; 2025 DoctorCare. All rights reserved.
        </p>
      </footer>
    </>
  );
}
