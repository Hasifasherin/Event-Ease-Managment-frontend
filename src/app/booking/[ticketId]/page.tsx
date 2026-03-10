"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createBooking } from "@/services/bookingService";
import { getTicket } from "@/services/ticketService";

interface Attendee {
  name: string;
  email: string;
  phone: string;
}

export default function BookingPage() {
  const { ticketId } = useParams();
  const router = useRouter();

  const [qty, setQty] = useState(1);
  const [attendees, setAttendees] = useState<Attendee[]>([{ name: "", email: "", phone: "" }]);
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadingTicket, setLoadingTicket] = useState(true);

  // Load ticket dynamically
  useEffect(() => {
    const loadTicket = async () => {
      try {
        const t = await getTicket(ticketId as string);
        setTicket(t);
      } catch (err) {
        console.error("Failed to load ticket", err);
        alert("Failed to load ticket data");
        router.back();
      } finally {
        setLoadingTicket(false);
      }
    };
    loadTicket();
  }, [ticketId, router]);

  // Sync attendees array with quantity
  const updateQty = (value: number) => {
    const newQty = Math.max(1, value);
    setQty(newQty);

    const updatedAttendees = [...attendees];
    if (newQty > attendees.length) {
      for (let i = attendees.length; i < newQty; i++) {
        updatedAttendees.push({ name: "", email: "", phone: "" });
      }
    } else {
      updatedAttendees.splice(newQty);
    }
    setAttendees(updatedAttendees);
  };

  const handleChange = (index: number, field: keyof Attendee, value: string) => {
    const updated = [...attendees];
    updated[index][field] = value;
    setAttendees(updated);
  };

  const handleBooking = async () => {
    if (!ticket) return;

    // Validate all attendee details before proceeding
    for (const [i, a] of attendees.entries()) {
      if (!a.name || !a.email || !a.phone) {
        alert(`Please fill all fields for Attendee ${i + 1}`);
        return;
      }
    }

    try {
      setLoading(true);

      // Send ticketId, quantity, and attendees to backend
      const booking = await createBooking({
        ticketId: ticket._id,
        quantity: qty,
        attendees, // <-- Important!
      });

      // Redirect to payment page with booking ID
      router.push(`/payment/${booking._id}`);
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || err?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingTicket) return <p className="p-10 text-center">Loading ticket details...</p>;
  if (!ticket) return null;

  const subtotal = ticket.price * qty;
  const total = subtotal;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">

        {/* LEFT SIDE: Ticket & Attendee Info */}
        <div className="md:col-span-2 space-y-6">

          {/* Ticket Selection */}
          <section className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Ticket Selection</h2>
            <div className="flex justify-between items-center border p-4 rounded-lg">
              <div>
                <p className="font-medium">{ticket.name}</p>
                <p className="text-gray-500 text-sm">₹{ticket.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => updateQty(qty - 1)} className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition">-</button>
                <span className="font-semibold">{qty}</span>
                <button onClick={() => updateQty(qty + 1)} className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition">+</button>
              </div>
            </div>
          </section>

          {/* Attendee Information */}
          <section className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Attendee Information</h2>
            <div className="space-y-6">
              {attendees.map((a, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Attendee {i + 1}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input placeholder="Full Name" className="border p-3 rounded" value={a.name} onChange={(e) => handleChange(i, "name", e.target.value)} />
                    <input placeholder="Email" className="border p-3 rounded" value={a.email} onChange={(e) => handleChange(i, "email", e.target.value)} />
                    <input placeholder="Phone" className="border p-3 rounded md:col-span-2" value={a.phone} onChange={(e) => handleChange(i, "phone", e.target.value)} />
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT SIDE: Payment Summary */}
        <aside className="sticky top-20">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Tickets</span>
                <span>{qty}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={loading}
              className={`w-full mt-4 py-3 rounded-lg text-white font-semibold transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>

            <button
              onClick={() => router.back()}
              className="w-full mt-2 py-3 rounded-lg border hover:bg-gray-100 transition"
            >
              Cancel
            </button>

          </div>
        </aside>

      </div>
    </div>
  );
}