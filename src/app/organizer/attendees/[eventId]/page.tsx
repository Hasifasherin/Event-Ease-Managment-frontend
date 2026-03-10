"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getEventAttendees,
  checkInAttendee,
} from "@/services/attendeeService";

export default function EventAttendeesPage() {
  const { eventId } = useParams();
  const [attendees, setAttendees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendees();
  }, [eventId]);

  const fetchAttendees = async () => {
    try {
      const data = await getEventAttendees(eventId as string);
      setAttendees(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (id: string) => {
    try {
      await checkInAttendee(id);

      setAttendees((prev) =>
        prev.map((attendee) =>
          attendee._id === id
            ? { ...attendee, checkInStatus: true }
            : attendee
        )
      );
    } catch (error) {
      console.error("Check-in failed");
    }
  };

  if (loading) return <p className="p-6">Loading attendees...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        Event Attendees
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {attendees.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-6">
                  No attendees found
                </td>
              </tr>
            ) : (
              attendees.map((attendee) => (
                <tr key={attendee._id} className="border-t">
                  <td className="p-3">{attendee.name}</td>
                  <td className="p-3">{attendee.email}</td>

                  <td className="p-3">
                    {attendee.checkInStatus ? (
                      <span className="text-green-600 font-semibold">
                        Checked In
                      </span>
                    ) : (
                      <span className="text-red-500">
                        Not Checked
                      </span>
                    )}
                  </td>

                  <td className="p-3">
                    {!attendee.checkInStatus && (
                      <button
                        onClick={() =>
                          handleCheckIn(attendee._id)
                        }
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg"
                      >
                        Check In
                      </button>
                    )}
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