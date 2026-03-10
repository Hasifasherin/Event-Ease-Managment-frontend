"use client";

import { useEffect, useState } from "react";
import {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "@/services/notificationService";

export default function OrganizerNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, [page]);

  const fetchNotifications = async () => {
    try {
      const data = await getMyNotifications(page);
      setNotifications(data.notifications || []);
      setPages(data.pages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id: string) => {
    await markAsRead(id);

    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id ? { ...n, status: "read" } : n
      )
    );
  };

  const handleDelete = async (id: string) => {
    await deleteNotification(id);
    setNotifications((prev) =>
      prev.filter((n) => n._id !== id)
    );
  };

  const handleMarkAll = async () => {
    await markAllAsRead();
    fetchNotifications();
  };

  if (loading) return <p className="p-6">Loading notifications...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Organizer Notifications
        </h1>

        <button
          onClick={handleMarkAll}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Mark All As Read
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications found</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  {notification.message}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(
                    notification.createdAt
                  ).toLocaleString()}
                </p>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    notification.status === "unread"
                      ? "bg-red-200 text-red-700"
                      : "bg-green-200 text-green-700"
                  }`}
                >
                  {notification.status}
                </span>
              </div>

              <div className="space-x-2">
                {notification.status === "unread" && (
                  <button
                    onClick={() =>
                      handleMarkRead(notification._id)
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Mark Read
                  </button>
                )}

                <button
                  onClick={() =>
                    handleDelete(notification._id)
                  }
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} / {pages}
        </span>

        <button
          disabled={page >= pages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>
  );
}