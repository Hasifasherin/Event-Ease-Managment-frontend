"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { getAllNotifications } from "@/services/adminService";
import SendNotificationForm from "./SendNotificationForm";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = async () => {
    try {
      setRefreshing(true);

      const data = await getAllNotifications();

      // ✅ FIX — store ONLY array
      setNotifications(data.notifications || []);

      // ✅ Store pagination info
      setMeta({
        total: data.total,
        page: data.page,
        pages: data.pages,
      });

    } catch (error) {
      console.error("Notification fetch error", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Notifications
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and broadcast platform notifications
          </p>
        </div>

        <button
          onClick={fetchNotifications}
          disabled={refreshing}
          className="flex items-center gap-2 px-5 py-2 rounded-xl
                     bg-blue-600 text-white hover:bg-blue-700
                     transition shadow-md"
        >
          <RefreshCw
            size={16}
            className={refreshing ? "animate-spin" : ""}
          />
          Refresh
        </button>

      </div>

      {/* ================= SEND FORM ================= */}
      <SendNotificationForm refresh={fetchNotifications} />

      {/* ================= NOTIFICATION LIST ================= */}
      <div className="bg-white rounded-3xl shadow border p-6 space-y-4">

        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No notifications found
          </p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="p-5 rounded-2xl border
                         bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50
                         hover:shadow-lg transition"
            >

              {/* MESSAGE */}
              <p className="font-semibold text-gray-800 text-lg">
                {notification.message}
              </p>

              {/* FOOTER INFO */}
              <div className="text-xs text-gray-500 mt-3 flex justify-between">

                <span className="px-3 py-1 rounded-full bg-white shadow-sm">
                  Type: {notification.type}
                </span>

                <span>
                  {new Date(notification.createdAt).toLocaleString()}
                </span>

              </div>

            </div>
          ))
        )}

      </div>

      {/* ================= PAGINATION INFO ================= */}

      {meta && (
        <div className="text-sm text-gray-500">
          Page {meta.page} of {meta.pages} | Total {meta.total}
        </div>
      )}

    </div>
  );
}