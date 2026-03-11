interface Event {
  _id: string;
  title: string;
  date?: string;
  location?: string;
}

interface Props {
  events?: Event[];
}

export default function OrganizerEvents({ events = [] }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md border overflow-hidden">

      <div className="px-6 py-4 bg-blue-600 text-white">
        <h2 className="text-lg font-semibold">
          My Events
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left">Event</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Location</th>
            </tr>
          </thead>

          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-10 text-gray-500">
                  No events found
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event._id} className="border-b hover:bg-blue-50">

                  <td className="py-3 px-4 font-medium">
                    {event.title}
                  </td>

                  <td className="py-3 px-4">
                    {event.date
                      ? new Date(event.date).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="py-3 px-4">
                    {event.location || "N/A"}
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