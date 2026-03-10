"use client";

import { useEffect, useState } from "react";
import { getOrganizerDashboard } from "@/services/organizerService";

import OrganizerStats from "./OrganizerStats";
import OrganizerEvents from "./OrganizerEvents";
import OrganizerBookings from "./OrganizerBookings";

import { LayoutDashboard } from "lucide-react";

export default function OrganizerDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getOrganizerDashboard();

        setStats(data.stats);
        setEvents(data.events);
        setBookings(data.bookings);
      } catch (err) {
        console.error("Organizer dashboard error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading organizer dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <LayoutDashboard size={28} />
          <h1 className="text-3xl font-bold">
            Organizer Dashboard
          </h1>
        </div>

        <p className="mt-2 text-blue-100">
          Manage your events, tickets, bookings & revenue.
        </p>
      </div>

      {/* STATS */}
      <OrganizerStats stats={stats} />

      {/* TABLES */}
      <div className="grid lg:grid-cols-2 gap-8">
        <OrganizerEvents events={events} />
        <OrganizerBookings bookings={bookings} />
      </div>

    </div>
  );
}