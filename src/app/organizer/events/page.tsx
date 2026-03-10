"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/services/api";
import { useRouter } from "next/navigation";

export default function OrganizerEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events/organizer/my-events");
      setEvents(res.data);
    } catch (error) {
      console.error("Fetch events error", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      await api.delete(`/events/${id}`);
      fetchEvents(); // refresh after delete
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Events</h1>

        <Link
          href="/organizer/events/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create Event
        </Link>
      </div>

      {/* Event Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-xl shadow-md overflow-hidden border"
          >

            {/* Image */}
            {event.bannerImage && (
              <img
                src={event.bannerImage}
                alt={event.title}
                className="h-40 w-full object-cover"
              />
            )}

            {/* Content */}
            <div className="p-4 space-y-3">

              <h2 className="text-lg font-bold">
                {event.title}
              </h2>

              <p className="text-sm text-gray-600">
                {event.description?.slice(0, 80)}
              </p>

              <p className="text-xs text-gray-500">
                Status: {event.status}
              </p>

              {/* Buttons */}
              <div className="flex gap-2 pt-2">

                {/* ✅ Update */}
                <button
                  onClick={() =>
                    router.push(`/organizer/events/edit/${event._id}`)
                  }
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Update
                </button>

                {/* ❌ Delete */}
                <button
                  onClick={() => handleDelete(event._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}