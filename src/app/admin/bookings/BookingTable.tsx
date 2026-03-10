"use client";

import { Eye, User, Ticket, DollarSign } from "lucide-react";
import BookingDetailsModal from "./BookingDetailsModal";
import { useState } from "react";

interface Props {
  bookings: any[];
}

export default function BookingTable({ bookings }: Props) {
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          {/* ================= HEADER ================= */}
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white uppercase text-xs tracking-wide">
            <tr>
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Event</th>
              <th className="px-6 py-4 text-left">Amount</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>

          {/* ================= BODY ================= */}
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-12 text-gray-500 text-base"
                >
                  🔎 No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-gray-100 hover:bg-purple-50 transition duration-200"
                >

                  {/* USER */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 font-medium text-gray-800">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <User size={15} className="text-blue-600" />
                      </div>
                      {booking.userId?.name || "Unknown"}
                    </div>
                  </td>

                  {/* EVENT */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                      <Ticket size={15} className="text-purple-600" />
                      {booking.eventId?.title || "Unknown Event"}
                    </div>
                  </td>

                  {/* AMOUNT */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-green-600 font-bold">
                      <DollarSign size={15} />
                      ₹ {booking.totalAmount ?? booking.amount ?? booking.price ?? 0}
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-semibold capitalize
                      ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-600"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : booking.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {booking.status || "N/A"}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelected(booking)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl
                                 bg-gradient-to-r from-purple-500 to-indigo-500
                                 text-white font-medium
                                 hover:scale-105 hover:shadow-lg
                                 transition duration-200"
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

      {/* ================= MODAL ================= */}
      {selected && (
        <BookingDetailsModal
          booking={selected}
          onClose={() => setSelected(null)}
        />
      )}

    </div>
  );
}