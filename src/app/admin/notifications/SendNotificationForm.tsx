"use client";

import { useState } from "react";
import { sendNotification } from "@/services/adminService";
import { Send, Loader2 } from "lucide-react";

interface Props {
  refresh: () => void;
}

export default function SendNotificationForm({ refresh }: Props) {
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await sendNotification({
        message,
        role: role || undefined,
      });

      setMessage("");
      setRole("");
      refresh();
    } catch (error) {
      alert("Failed to send notification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 
                 space-y-6 
                 bg-gradient-to-br from-blue-50 to-purple-50"
    >

      {/* TITLE */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
         Broadcast Notification
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Send message to users or organizers
        </p>
      </div>

      {/* MESSAGE */}
      <div>
        <textarea
          placeholder="Write your notification message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-4 rounded-2xl border border-gray-200 
                     focus:ring-2 focus:ring-blue-500 
                     outline-none resize-none 
                     shadow-sm text-black"
          rows={4}
          required
        />
      </div>

      {/* ROLE FILTER */}
      <div>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-4 rounded-2xl border border-gray-200 
                     focus:ring-2 focus:ring-purple-500 
                     outline-none shadow-sm text-black"
        >
          <option value="">🌍 Send to Everyone</option>
          <option value="user">👤 Users Only</option>
          <option value="organizer">🏢 Organizers Only</option>
        </select>
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 
                   py-3 rounded-2xl 
                   bg-gradient-to-r from-blue-600 to-purple-600
                   hover:from-blue-700 hover:to-purple-700
                   text-white font-semibold
                   transition duration-300
                   disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Notification
          </>
        )}
      </button>

    </form>
  );
}