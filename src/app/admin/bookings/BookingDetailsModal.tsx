"use client";

import { X, User, Calendar, Ticket, DollarSign } from "lucide-react";

interface Props {
  booking: any;
  onClose: () => void;
}

export default function BookingDetailsModal({ booking, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50 animate-fadeIn">

      <div className="bg-white w-[420px] max-w-[95%] rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100">

        {/* ================= HEADER ================= */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 flex justify-between items-center">

          <h2 className="text-lg font-bold text-white tracking-wide">
            Booking Details
          </h2>

          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 rounded-full p-1 transition duration-200"
          >
            <X size={18} className="text-white" />
          </button>

        </div>

        {/* ================= CONTENT ================= */}
        <div className="p-6 space-y-5">

          {/* USER */}
          <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-2xl border border-blue-100">
            <User size={18} className="text-blue-600" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                User
              </p>
              <p className="font-semibold text-gray-800">
                {booking.userId?.name || "Unknown"}
              </p>
            </div>
          </div>

          {/* EVENT */}
          <div className="flex items-center gap-4 bg-purple-50 p-4 rounded-2xl border border-purple-100">
            <Ticket size={18} className="text-purple-600" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Event
              </p>
              <p className="font-semibold text-gray-800">
                {booking.eventId?.title || "Unknown Event"}
              </p>
            </div>
          </div>

          {/* AMOUNT */}
          <div className="flex items-center gap-4 bg-green-50 p-4 rounded-2xl border border-green-100">
            <DollarSign size={18} className="text-green-600" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Amount
              </p>
              <p className="font-bold text-green-600 text-lg">
                ₹{" "}
                {booking.totalAmount ??
                  booking.amount ??
                  booking.price ??
                  0}
              </p>
            </div>
          </div>

          {/* STATUS */}
          <div className="p-4 rounded-2xl border border-gray-200">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
              Status
            </p>

            <span
              className={`px-5 py-1.5 rounded-full text-xs font-semibold capitalize
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
          </div>

          {/* DATE */}
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <Calendar size={18} className="text-gray-600" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Booked On
              </p>
              <p className="text-gray-800 font-medium">
                {booking.createdAt
                  ? new Date(booking.createdAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}