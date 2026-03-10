import { CalendarDays, User, Ticket } from "lucide-react";

interface Props {
  bookings: any[];
}

export default function RecentBookings({ bookings }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md border overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
        <h2 className="text-lg font-semibold">Recent Bookings</h2>

        <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
          {bookings.length} bookings
        </span>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          {/* TABLE HEAD */}
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="text-left py-3 px-4">User</th>
              <th className="text-left py-3 px-4">Event</th>
              <th className="text-left py-3 px-4">Date</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-10 text-gray-500"
                >
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b hover:bg-blue-50 transition"
                >
                  {/* USER */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 p-2 rounded-lg text-blue-600">
                        <User size={16} />
                      </span>
                      <span className="text-gray-700 font-medium">
                        {booking.userId?.name || "Unknown"}
                      </span>
                    </div>
                  </td>

                  {/* EVENT */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-100 p-2 rounded-lg text-purple-600">
                        <Ticket size={16} />
                      </span>
                      <span className="text-gray-800 font-semibold">
                        {booking.eventId?.title || "Unknown Event"}
                      </span>
                    </div>
                  </td>

                  {/* DATE */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="bg-green-100 p-2 rounded-lg text-green-600">
                        <CalendarDays size={16} />
                      </span>
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </div>
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