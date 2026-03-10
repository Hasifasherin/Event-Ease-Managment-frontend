"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getEventById } from "@/services/publicService";
import { getTicketsByEvent } from "@/services/ticketService";

interface Ticket {
  _id: string;
  name: string;
  price: number;
  available: number;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  category?: string;
  location: string;
  bannerImage?: string;
  startDate: string;
  endDate?: string;
  agenda?: { session: string; time: string; speaker: string }[];
  organizerName?: string;
  minPrice?: number;
}

export default function EventDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState<Event | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEventData = async () => {
      try {
        setLoading(true);
        const eventData = await getEventById(id as string);
        const ticketData = await getTicketsByEvent(id as string);

        setEvent(eventData);
        setTickets(ticketData);

        if (ticketData.length > 0) {
          setSelectedTicket(ticketData[0]);
        }
      } catch (err) {
        console.error("Failed to load event:", err);
        setError("Failed to load event data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadEventData();
  }, [id]);

  const handleBook = () => {
    if (!selectedTicket) return;
    router.push(`/booking/${selectedTicket._id}?qty=${quantity}`);
  };

  if (loading) {
    return (
      <p className="p-10 text-center text-gray-600 font-medium">
        Loading event details...
      </p>
    );
  }

  if (error || !event) {
    return (
      <p className="p-10 text-center text-red-500 font-medium">
        {error || "Event not found."}
      </p>
    );
  }

  const startDate = new Date(event.startDate);
  const endDate = event.endDate ? new Date(event.endDate) : startDate;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">

      {/* HERO SECTION */}
      <div className="relative h-[420px] w-full">
        <img
          src={event.bannerImage || "/placeholder-event.jpg"}
          alt={event.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col justify-end pb-10 text-white px-6">
          {event.category && (
            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded w-fit text-sm mb-2">
              {event.category}
            </span>
          )}
          <h1 className="text-4xl font-bold">{event.title}</h1>
          <div className="flex gap-6 text-sm mt-3">
            <p>
              📅 {startDate.toLocaleDateString()}{" "}
              {endDate > startDate && `- ${endDate.toLocaleDateString()}`}
            </p>
            <p>📍 {event.location}</p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 mt-10 grid md:grid-cols-3 gap-10">

        {/* LEFT COLUMN */}
        <div className="md:col-span-2 space-y-8">

          {/* ABOUT */}
          <section className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-3">About this event</h2>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </section>

          {/* AGENDA */}
          {event.agenda && event.agenda.length > 0 && (
            <section className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Event Schedule</h2>
              {event.agenda.map((item, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4 mb-4">
                  <p className="font-medium">{item.session}</p>
                  <p className="text-sm text-gray-500">
                    {item.time} • {item.speaker}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* ORGANIZER */}
          <section className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Organizer</h2>
            <p className="text-gray-700">{event.organizerName || "Event Organizer"}</p>
          </section>

          {/* RULES & POLICIES */}
          <section className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Rules & Policies</h2>
            <p className="text-gray-600">
              Please carry your ticket confirmation email during entry. Refunds are not available once tickets are purchased.
            </p>
          </section>

        </div>

        {/* RIGHT COLUMN - BOOKING PANEL */}
        <div className="sticky top-24 h-fit">
          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-lg font-semibold mb-4">Select Tickets</h2>

            {tickets.length === 0 ? (
              <p className="text-red-500">Tickets Sold Out</p>
            ) : (
              tickets.map((ticket) => {
                const soldOut = ticket.available === 0;
                return (
                  <label
                    key={ticket._id}
                    className={`block border rounded-lg p-4 mb-3 transition
                    ${soldOut ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-blue-400"}
                    ${selectedTicket?._id === ticket._id ? "border-blue-600 bg-blue-50" : ""}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{ticket.name}</p>
                        <p className="text-sm text-gray-500">₹{ticket.price}</p>
                        {soldOut && <p className="text-xs text-red-500">Sold Out</p>}
                      </div>
                      <input
                        type="radio"
                        disabled={soldOut}
                        checked={selectedTicket?._id === ticket._id}
                        onChange={() => setSelectedTicket(ticket)}
                      />
                    </div>
                  </label>
                );
              })
            )}

            {selectedTicket && (
              <>
                {/* QUANTITY */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-medium">Quantity</span>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="border rounded w-20 p-2 text-center"
                  />
                </div>

                {/* TOTAL PRICE */}
                <div className="mt-4 text-lg font-semibold">
                  Total: ₹{selectedTicket.price * quantity}
                </div>
              </>
            )}

            {/* BOOK BUTTON */}
            <button
              disabled={!selectedTicket}
              onClick={handleBook}
              className={`mt-5 w-full py-3 rounded-lg text-white font-semibold transition
              ${selectedTicket ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
            >
              Book Ticket
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}