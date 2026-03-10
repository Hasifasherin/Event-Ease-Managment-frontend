"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "./LoginModal";

export default function EventCard({ event }: any) {
  const router = useRouter();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const today = new Date();
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate || event.startDate);

  // Determine status
  let status = "";
  let statusColor = "";
  let isEnded = false;

  if (today < startDate) {
    status = "Upcoming";
    statusColor = "bg-blue-500";
  } else if (today >= startDate && today <= endDate) {
    status = "Ongoing";
    statusColor = "bg-green-500";
  } else {
    status = "Ended";
    statusColor = "bg-gray-500";
    isEnded = true;
  }

  // Early return: hide ended events
  if (isEnded) return null;

  // Ticket availability
  const ticketsAvailable =
    event.availableTickets === undefined || event.availableTickets > 0;

  const openEvent = () => {
    router.push(`/event/${event._id}`);
  };

  const handleBooking = (e: any) => {
    e.stopPropagation();

    if (!ticketsAvailable) return;

    if (!user) {
      setShowModal(true);
      return;
    }

    router.push(`/event/${event._id}`);
  };

  return (
    <>
      <div
        onClick={openEvent}
        className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
      >
        {/* IMAGE */}
        <div className="relative">
          <img
            src={event.bannerImage || "/placeholder-event.jpg"}
            alt={event.title}
            className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* STATUS */}
          <span
            className={`absolute top-3 left-3 text-white text-xs font-semibold px-2 py-1 rounded ${statusColor}`}
          >
            {status}
          </span>

          {/* CATEGORY */}
          {event.category && (
            <span className="absolute top-3 right-3 bg-white/90 text-gray-800 text-xs px-2 py-1 rounded">
              {event.category}
            </span>
          )}

          {/* SOLD OUT BADGE */}
          {!ticketsAvailable && (
            <span className="absolute bottom-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
              Sold Out
            </span>
          )}

          {/* TITLE */}
          <h3 className="absolute bottom-3 left-3 right-3 text-white font-bold text-lg leading-tight line-clamp-2">
            {event.title}
          </h3>
        </div>

        {/* CONTENT */}
        <div className="p-4">
          <p className="text-sm text-gray-600">📍 {event.location}</p>
          <p className="text-xs text-gray-500 mt-1">
            📅 {startDate.toLocaleDateString()}{" "}
            {endDate > startDate && ` - ${endDate.toLocaleDateString()}`}
          </p>

          <p className="text-sm font-semibold text-blue-600 mt-2">
            From ₹{event.minPrice || "Free"}
          </p>

          {/* BOOK BUTTON */}
          <button
            onClick={handleBooking}
            disabled={!ticketsAvailable}
            className={`mt-3 w-full py-2 rounded-lg text-white font-medium transition
            ${
              ticketsAvailable
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {ticketsAvailable ? "Book Ticket" : "Sold Out"}
          </button>
        </div>
      </div>

      <LoginModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}