interface User {
  _id: string;
  name: string;
  email: string;
}

interface Event {
  _id: string;
  title: string;
}

interface Booking {
  _id: string;
  userId?: User;
  eventId?: Event;
  createdAt: string;
}

interface Props {
  bookings?: Booking[];
}

export default function OrganizerBookings({ bookings = [] }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md border overflow-hidden">
      
      <div className="px-6 py-4 bg-indigo-600 text-white">
        <h2 className="text-lg font-semibold">
          Recent Bookings
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Event</th>
              <th className="py-3 px-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-10 text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking._id} className="border-b hover:bg-indigo-50">
                  
                  <td className="py-3 px-4">
                    {booking.userId?.name ?? "Unknown"}
                  </td>

                  <td className="py-3 px-4">
                    {booking.eventId?.title ?? "Unknown Event"}
                  </td>

                  <td className="py-3 px-4">
                    {new Date(booking.createdAt).toLocaleDateString()}
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