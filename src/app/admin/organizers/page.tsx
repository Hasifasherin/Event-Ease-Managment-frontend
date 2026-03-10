"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import OrganizersTable from "./OrganizersTable";
import { getAllOrganizers } from "@/services/adminService";

export default function OrganizersPage() {
  const [organizers, setOrganizers] = useState<any[]>([]);
  const [filteredOrganizers, setFilteredOrganizers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const data = await getAllOrganizers();
        setOrganizers(data);
        setFilteredOrganizers(data);
      } catch (error) {
        console.error("Organizers fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizers();
  }, []);

  /* SEARCH */
  useEffect(() => {
    const result = organizers.filter(
      (org) =>
        org.name?.toLowerCase().includes(search.toLowerCase()) ||
        org.email?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredOrganizers(result);
  }, [search, organizers]);

  if (loading) {
    return <p className="text-gray-500">Loading organizers...</p>;
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          Organizers Management
        </h1>

        <span className="text-sm text-gray-500">
          {filteredOrganizers.length} organizers
        </span>
      </div>

      {/* SEARCH */}
      <div className="relative w-full md:w-96">
        <Search size={18} className="absolute left-3 top-3 text-gray-400" />

        <input
          type="text"
          placeholder="Search organizers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* TABLE */}
      <OrganizersTable organizers={filteredOrganizers} />

    </div>
  );
}