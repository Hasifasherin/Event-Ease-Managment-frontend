"use client";

import { useRouter } from "next/navigation";
import EventForm from "../../../../components/EventForm";
import api from "@/services/api";

export default function CreateEventPage() {

  const router = useRouter();

  const handleCreate = async (data: any) => {

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    await api.post("/events", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    router.push("/organizer/events");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>

      <EventForm onSubmit={handleCreate} />
    </div>
  );
}