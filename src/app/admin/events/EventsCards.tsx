"use client";

import { useState } from "react";
import { Trash2, Calendar, MapPin, User, X } from "lucide-react";
import { deleteEvent } from "@/services/adminService";

interface Props {
  events: any[];
  refreshEvents: () => void;
}

export default function EventsCards({ events, refreshEvents }: Props) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setLoading(true);
      await deleteEvent(deleteId);
      refreshEvents();
      setDeleteId(null);
    } catch (error) {
      alert("Cannot delete event. It may have bookings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {events.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            No events found
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >

              {/* IMAGE */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.bannerImage || "https://via.placeholder.com/600x400"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* STATUS BADGE */}
                <span
                  className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md
                  ${
                    event.status === "upcoming"
                      ? "bg-blue-500/20 text-blue-600"
                      : event.status === "ongoing"
                      ? "bg-green-500/20 text-green-600"
                      : "bg-gray-600/20 text-gray-700"
                  }`}
                >
                  {event.status}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">

                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                  {event.title}
                </h3>

                <div className="text-xs px-3 py-1 rounded-full inline-block bg-purple-100 text-purple-600">
                  {event.category || "General"}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User size={15} />
                  {event.organizerId?.name || "Unknown"}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={15} />
                  {event.location || "-"}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={15} />
                  {new Date(event.startDate).toLocaleDateString()}
                </div>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => setDeleteId(event._id)}
                  className="w-full mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 rounded-xl font-medium hover:opacity-90 transition"
                >
                  <Trash2 size={16} />
                  Delete Event
                </button>

              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= DELETE CONFIRM MODAL ================= */}

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-fadeIn">

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Confirm Delete
              </h2>

              <button
                onClick={() => setDeleteId(null)}
                className="text-gray-500 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>

            {/* BODY */}
            <p className="mt-4 text-gray-600">
              Are you sure you want to delete this event?
              <br />
              <span className="text-red-600 font-medium">
                This action cannot be undone.
              </span>
            </p>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-black hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}