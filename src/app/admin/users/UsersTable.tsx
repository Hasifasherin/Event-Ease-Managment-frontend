"use client";

import { User, Trash2, ShieldBan, AlertTriangle } from "lucide-react";
import { blockUser, deleteUser } from "@/services/adminService";
import { useState } from "react";

interface Props {
  users: any[];
}

export default function UsersTable({ users }: Props) {
  const [userList, setUserList] = useState(users);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  /* BLOCK USER */
  const handleBlock = async (id: string) => {
    try {
      const res = await blockUser(id);

      setUserList((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, isBlocked: res.user.isBlocked } : u
        )
      );
    } catch (error) {
      console.error("Block error:", error);
    }
  };

  /* DELETE USER */
  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteUser(deleteId);

      setUserList((prev) => prev.filter((u) => u._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            {/* HEADER */}
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="text-left py-3 px-4">User</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Joined</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {userList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                userList.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    {/* USER */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <User size={16} />
                        </div>

                        <span className="font-medium text-gray-800">
                          {user.name}
                        </span>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="py-3 px-4 text-gray-600">
                      {user.email}
                    </td>

                    {/* ROLE */}
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-600"
                            : user.role === "organizer"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* DATE */}
                    <td className="py-3 px-4 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* ACTIONS */}
                    <td className="py-3 px-4 flex gap-4">

                      <button
                        onClick={() => handleBlock(user._id)}
                        className={`flex items-center gap-1 font-medium
                          ${
                            user.isBlocked
                              ? "text-green-600 hover:text-green-700"
                              : "text-yellow-600 hover:text-yellow-700"
                          }`}
                      >
                        <ShieldBan size={16} />
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>

                      <button
                        onClick={() => setDeleteId(user._id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium"
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

      {/* DELETE CONFIRMATION MODAL */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

          <div className="bg-white rounded-xl shadow-lg p-6 w-[380px] text-center">

            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertTriangle size={24} />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Delete User
            </h3>

            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4">

              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}