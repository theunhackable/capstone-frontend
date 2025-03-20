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
  UserPlus,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-32 items-center justify-center">
        {/* Hero Section */}
        <section
          id="hero"
          className="container flex flex-col items-center justify-center h-96 text-center"
        >
          <h1 className="font-bold text-4xl leading-snug">
            Book Your Appointment <br />
            <span className="text-sky-500">With Ease</span>
          </h1>
          <p className="italic mt-3 text-lg text-gray-600 dark:text-gray-300">
            Find the best doctors and book hassle-free appointments instantly.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 justify-center">
            <Link
              href="/user/doctor/search"
              className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition duration-300"
            >
              <Search size={18} />
              Search Doctors
            </Link>
            <Link
              href="/signup"
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              <UserPlus size={18} />
              Sign up now
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mt-10 text-center">
          <h2 className="text-3xl font-bold">Features</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 italic">
            Simple features to get an appointment
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-5">
            {[
              {
                icon: <Search size={32} className="text-sky-500" />,
                title: "Search Doctors",
                description: "Find top-rated doctors by specialty.",
              },
              {
                icon: <CalendarCheck size={32} className="text-green-500" />,
                title: "Easy Scheduling",
                description: "Book appointments at your convenience.",
              },
              {
                icon: <ShieldCheck size={32} className="text-yellow-500" />,
                title: "Secure Records",
                description: "Keep medical records secure and safe.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-5 border rounded-lg shadow-sm hover:shadow-md transition duration-300 w-64"
              >
                {feature.icon}
                <h3 className="mt-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="container mt-10 text-center">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 italic">
            Get started in just 3 easy steps.
          </p>
          <div className="flex flex-wrap justify-center gap-5 mt-5">
            {[
              {
                icon: <UserCheck size={32} className="text-indigo-500" />,
                title: "Sign Up or Log In",
                description: "Create your account in minutes.",
              },
              {
                icon: <Stethoscope size={32} className="text-red-500" />,
                title: "Choose a Doctor",
                description: "Browse and select the best doctor.",
              },
              {
                icon: <CalendarCheck size={32} className="text-green-500" />,
                title: "Book Your Slot",
                description: "Schedule an appointment quickly.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-5 border rounded-lg shadow-sm hover:shadow-md transition duration-300 w-64"
              >
                {step.icon}
                <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact-us" className="container mt-10 text-center">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            We’re here to help you 24/7.
          </p>
          <div className="flex flex-wrap gap-5 mt-5 justify-center">
            {[
              {
                icon: <PhoneCall size={20} className="text-blue-500" />,
                text: "+1 (800) 123-4567",
              },
              {
                icon: <FileText size={20} className="text-green-500" />,
                text: "support@doctorcare.com",
              },
              {
                icon: <MapPin size={20} className="text-red-500" />,
                text: "123 Main Street, NY, USA",
              },
            ].map((contact, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 border rounded-lg shadow-sm hover:shadow-md transition duration-300 w-64"
              >
                {contact.icon}
                <p className="text-gray-600 dark:text-gray-300">
                  {contact.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="mt-10 p-5 bg-gray-100 text-center w-full">
        <p className="text-sm text-gray-500">
          &copy; 2025 DoctorCare. All rights reserved.
        </p>
      </footer>
    </>
  );
}
