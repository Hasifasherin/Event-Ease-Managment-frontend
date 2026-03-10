"use client";

import { useEffect, useState } from "react";
import { getAdminDashboard } from "@/services/adminService";

import StatsCards from "./StatsCards";
import RecentBookings from "./RecentBookings";
import RecentEvents from "./RecentEvents";

import { LayoutDashboard } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getAdminDashboard();

        setStats(data.stats);
        setRecentBookings(data.recentBookings);
        setRecentEvents(data.recentEvents);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500 text-lg">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <LayoutDashboard size={28} />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <p className="mt-2 text-indigo-100">
          Manage events, monitor bookings, and track platform activity.
        </p>
      </div>

      {/* Stats */}
      <StatsCards stats={stats} />

      {/* Tables Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <RecentBookings bookings={recentBookings} />
        <RecentEvents events={recentEvents} />
      </div>

    </div>
  );
}