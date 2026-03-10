import { CalendarDays, User, Ticket } from "lucide-react";

interface Props {
  events: any[];
}

export default function RecentEvents({ events }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="p-2 bg-purple-100 text-purple-600 rounded-lg">
            <Ticket size={18} />
          </span>
          <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
            Recent Events
          </span>
        </h2>

        <span className="text-sm bg-purple-50 text-purple-600 px-3 py-1 rounded-full font-medium">
          {events.length} events
        </span>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          {/* TABLE HEAD */}
          <thead>
            <tr className="bg-gradient-to-r from-purple-50 to-indigo-50 text-gray-700 uppercase text-xs">
              <th className="text-left py-3 px-4">Event</th>
              <th className="text-left py-3 px-4">Organizer</th>
              <th className="text-left py-3 px-4">Created</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-400">
                  No events found
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr
                  key={event._id}
                  className="border-b hover:bg-purple-50 transition-all"
                >
                  {/* EVENT TITLE */}
                  <td className="py-3 px-4 font-semibold text-gray-800">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 bg-indigo-100 text-indigo-600 rounded-md">
                        <Ticket size={14} />
                      </span>
                      {event.title}
                    </div>
                  </td>

                  {/* ORGANIZER */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="p-1.5 bg-green-100 text-green-600 rounded-md">
                        <User size={14} />
                      </span>
                      {event.organizerId?.name || "Unknown"}
                    </div>
                  </td>

                  {/* DATE */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="p-1.5 bg-orange-100 text-orange-600 rounded-md">
                        <CalendarDays size={14} />
                      </span>
                      {new Date(event.createdAt).toLocaleDateString()}
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