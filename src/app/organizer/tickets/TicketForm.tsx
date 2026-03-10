"use client";

import { useState, useEffect } from "react";

interface Props {
  eventId: string;
  initialData?: any;
  onSuccess: (data: any) => void;
  onClose?: () => void;
}

export default function TicketForm({
  eventId,
  initialData,
  onSuccess,
}: Props) {

  const [form, setForm] = useState({
    name: "",
    type: "",
    price: "",
    quantity: ""
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    onSuccess(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <input
        name="name"
        placeholder="Ticket Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        name="type"
        placeholder="Ticket Type"
        value={form.type}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        name="quantity"
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Save Ticket
      </button>

    </form>
  );
}