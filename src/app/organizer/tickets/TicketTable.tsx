"use client";

import { deleteTicket } from "@/services/ticketService";
import { Trash, Edit } from "lucide-react";

interface Props {
  tickets: any[];
  onRefresh: () => void;
  onEdit: (ticket: any) => void;
}

export default function TicketTable({ tickets, onRefresh, onEdit }: Props) {

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this ticket?")) return;

    await deleteTicket(id);
    onRefresh();
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">

      <h2 className="text-xl font-bold mb-4">Tickets</h2>

      {tickets.length === 0 ? (
        <p className="text-gray-500">No tickets created yet</p>
      ) : (

        <table className="w-full text-sm">

          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Price</th>
              <th className="text-left p-2">Quantity</th>
              <th className="text-left p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="border-b">

                <td className="p-2">{ticket.name}</td>
                <td className="p-2">₹{ticket.price}</td>
                <td className="p-2">{ticket.quantity}</td>

                <td className="p-2 flex gap-3">
                  <button
                    onClick={() => onEdit(ticket)}
                    className="text-blue-600"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(ticket._id)}
                    className="text-red-600"
                  >
                    <Trash size={18} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      )}

    </div>
  );
}