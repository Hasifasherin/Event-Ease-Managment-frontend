"use client";

import { User, Trash2, ShieldBan } from "lucide-react";
import { deleteUser, blockUser } from "@/services/adminService";
import { useState } from "react";

interface Props {
  organizers: any[];
}

export default function OrganizersTable({ organizers }: Props) {

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this organizer?"
    );

    if (!confirmDelete) return;

    try {
      setLoadingId(id);
      await deleteUser(id);
      window.location.reload();
    } catch (error) {
      console.error("Delete error", error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleBlock = async (id: string) => {
    try {
      setLoadingId(id);
      await blockUser(id);
      window.location.reload();
    } catch (error) {
      console.error("Block error", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          {/* HEADER */}
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="text-left py-3 px-4">Organizer</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Role</th>
              <th className="text-left py-3 px-4">Joined</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {organizers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  No organizers found
                </td>
              </tr>
            ) : (
              organizers.map((org) => (
                <tr
                  key={org._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  {/* ORGANIZER */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
                        <User size={16} />
                      </div>

                      <span className="font-medium text-gray-800">
                        {org.name}
                      </span>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="py-3 px-4 text-gray-600">
                    {org.email}
                  </td>

                  {/* ROLE */}
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600">
                      organizer
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="py-3 px-4 text-gray-500">
                    {new Date(org.createdAt).toLocaleDateString()}
                  </td>

                  {/* ACTIONS */}
                  <td className="py-3 px-4 flex gap-3">

                    <button
                      onClick={() => handleBlock(org._id)}
                      disabled={loadingId === org._id}
                      className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700"
                    >
                      <ShieldBan size={16} />
                      Block
                    </button>

                    <button
                      onClick={() => handleDelete(org._id)}
                      disabled={loadingId === org._id}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}