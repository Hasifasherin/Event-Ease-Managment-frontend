"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import UsersTable from "./UsersTable";
import { getAllUsers } from "@/services/adminService";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Users fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /* SEARCH */
  useEffect(() => {
    const result = users.filter(
      (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(result);
  }, [search, users]);

  if (loading) {
    return <p className="text-gray-500">Loading users...</p>;
  }

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          Users Management
        </h1>

        <span className="text-sm text-gray-500">
          {filteredUsers.length} users
        </span>
      </div>

      {/* SEARCH */}
      <div className="relative w-full md:w-96">
        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* TABLE */}
      <UsersTable users={filteredUsers} />

    </div>
  );
}