"use client";

import { useEffect, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import BookingTable from "./BookingTable";
import { getAllBookings } from "@/services/adminService";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = async () => {
    try {
      setRefreshing(true);
      const data = await getAllBookings();
      setBookings(data || []);
      setFiltered(data || []);
    } catch (error) {
      console.error("Booking fetch error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* SEARCH */
  useEffect(() => {
    const result = bookings.filter(
      (b) =>
        b.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
        b.eventId?.title?.toLowerCase().includes(search.toLowerCase())
    );

    setFiltered(result);
  }, [search, bookings]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="animate-pulse text-gray-500">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Bookings Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all event bookings from here
          </p>
        </div>

        <div className="flex items-center gap-4">

          <span className="px-5 py-2 rounded-2xl bg-blue-100 text-blue-600 font-medium">
            {filtered.length} Bookings
          </span>

          <button
            onClick={fetchBookings}
            disabled={refreshing}
           className="flex items-center gap-2 px-5 py-2 rounded-2xl
                         bg-gray-100 hover:bg-gray-200
                         text-gray-700 font-medium
                         transition-all duration-300
                         hover:scale-105"
            >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>

        </div>

      </div>

      {/* SEARCH */}
      <div className="relative w-full md:w-96">

        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

        <input
          type="text"
          placeholder="Search by booking or event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 
                         rounded-2xl
                         border border-gray-200
                         bg-white
                         text-black
                         focus:ring-2 focus:ring-purple-500
                         focus:border-purple-500
                         outline-none
                         shadow-sm
                         transition-all
                         hover:shadow-md"
            />

      </div>

      {/* TABLE */}
      <BookingTable bookings={filtered} />

    </div>
  );
}