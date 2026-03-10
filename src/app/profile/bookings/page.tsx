"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMyBookings } from "@/services/bookingService";

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };

    loadBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">My Bookings</h1>

      {bookings.length === 0 && (
        <p className="text-gray-500 text-center mt-20">
          You have no bookings yet. Explore events and book your tickets!
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((b) => {
          const statusColor =
            b.status === "confirmed" ? "green" :
            b.status === "cancelled" ? "red" :
            "gray";

          const paymentColor =
            b.paymentStatus === "paid" ? "green" :
            b.paymentStatus === "pending" ? "yellow" :
            "red";

          return (
            <div
              key={b._id}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between hover:shadow-2xl transition"
            >
              {/* Event Title */}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {b.eventId.title}
              </h2>

              {/* Event Date & Location */}
              <p className="text-gray-500 mb-2">
                📅 {new Date(b.bookingDate).toLocaleDateString()} • 📍 {b.eventId.location}
              </p>

              {/* Tickets & Total */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Tickets:</span>
                <span className="font-medium">{b.quantity}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Total:</span>
                <span className="font-medium">₹{b.total}</span>
              </div>

              {/* Status Badges */}
              <div className="flex gap-2 mt-2 mb-4 flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold text-white bg-${statusColor}-600`}
                >
                  {b.status.toUpperCase()}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold text-white bg-${paymentColor}-500`}
                >
                  {b.paymentStatus.toUpperCase()}
                </span>
              </div>

              {/* Action Button */}
              
            </div>
          );
        })}
      </div>
    </div>
  );
}