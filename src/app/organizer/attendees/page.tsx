"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getOrganizerEvents } from "@/services/attendeeService";

export default function OrganizerAttendeesPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getOrganizerEvents();
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading events...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Select Event</h1>

      {events.length === 0 ? (
        <p className="text-gray-500">No events found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {events.map((event) => (
            <Link
              key={event._id}
              href={`/organizer/attendees/${event._id}`}
              className="border p-4 rounded-xl shadow-sm hover:bg-gray-100 transition"
            >
              <h2 className="font-semibold text-lg">{event.title}</h2>
              <p className="text-sm text-gray-500">
                {event.location}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}