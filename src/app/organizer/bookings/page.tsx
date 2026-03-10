"use client";

import { useEffect, useState } from "react";
import { getOrganizerBookings } from "@/services/bookingService";

export default function OrganizerBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getOrganizerBookings();
      setBookings(data);
    } catch (error) {
      console.error("Booking fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading bookings...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Organizer Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found for your events.</p>
      ) : (
        <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Event</th>
                <th className="p-3 text-left">Ticket</th>
                <th className="p-3 text-left">Qty</th>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b">
                  <td className="p-3">{booking.userId?.name}</td>
                  <td className="p-3">{booking.eventId?.title}</td>
                  <td className="p-3">{booking.ticketId?.name}</td>
                  <td className="p-3">{booking.quantity}</td>
                  <td className="p-3">{booking.paymentStatus}</td>
                  <td className="p-3">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}