"use client";

import { useEffect, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import EventsCards from "./EventsCards";
import { getAllEvents } from "@/services/adminService";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = async () => {
    try {
      setRefreshing(true);
      const data = await getAllEvents();

      setEvents(data.events || []);
      setFilteredEvents(data.events || []);
    } catch (error) {
      console.error("Events fetch error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  /* SEARCH FILTER */
  useEffect(() => {
    const result = events.filter(
      (event) =>
        event.title?.toLowerCase().includes(search.toLowerCase()) ||
        event.organizerId?.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredEvents(result);
  }, [search, events]);

  /* LOADING */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-pulse text-gray-500 text-lg">
          Loading events...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* ================= TOP CONTROL PANEL ================= */}
      <div className="bg-white/70 backdrop-blur-xl border border-gray-200 
                      rounded-3xl p-6 shadow-lg">

        <div className="flex flex-col md:flex-row md:items-center 
                        md:justify-between gap-6">

          {/* LEFT TITLE */}
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r 
                           from-blue-600 to-purple-600 
                           bg-clip-text text-transparent">
              Events Management
            </h1>

            <p className="text-gray-500 mt-1 text-sm">
              Manage platform events with search & control
            </p>
          </div>

          {/* RIGHT CONTROLS */}
          <div className="flex items-center gap-4">

            {/* EVENT COUNT BADGE */}
            <div className="px-5 py-2 rounded-2xl 
                            bg-gradient-to-r from-blue-500 to-purple-500
                            text-white text-sm font-semibold shadow-md">
              {filteredEvents.length} Events
            </div>

            {/* REFRESH BUTTON */}
            <button
              onClick={fetchEvents}
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

        {/* ================= SEARCH BAR ================= */}
        <div className="mt-8 w-full md:w-96">

          <div className="relative group">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2
                         text-gray-400
                         group-focus-within:text-purple-600
                         transition"
            />

            <input
              type="text"
              placeholder="Search by event title or organizer..."
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
        </div>

      </div>

      {/* ================= EVENTS CARDS ================= */}
      <EventsCards
        events={filteredEvents}
        refreshEvents={fetchEvents}
      />

    </div>
  );
}