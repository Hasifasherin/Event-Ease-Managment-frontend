"use client";

import EventCard from "./EventCard";

interface Event {
  _id: string;
  title: string;
  bannerImage?: string;
  location?: string;
}

interface Props {
  events: Event[];
}

export default function EventGrid({ events }: Props) {
  if (!events.length) {
    return (
      <div className="text-gray-500 text-center py-10">
        No events found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-0">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}