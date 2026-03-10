interface Props {
  events?: any[];
}

export default function OrganizerEvents({ events = [] }: Props) {
  return (
    <div>
      <table>
        <tbody>
          {events.length === 0 ? (
            <tr>
              <td>No events found</td>
            </tr>
          ) : (
            events.map((event) => (
              <tr key={event._id}>
                <td>{event.title}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}