"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";
import EventForm from "../../../../../components/EventForm";

export default function EditEventPage() {
  const { id } = useParams();
  const router = useRouter();
  const [eventData, setEventData] = useState<any>(null);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${id}`);
      setEventData(res.data);
    } catch (error) {
      console.error("Fetch event error", error);
    }
  };

  const handleUpdate = async (formData: any) => {

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    await api.put(`/events/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    router.push("/organizer/events");
  };

  if (!eventData) {
    return <div>Loading event...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Update Event</h1>

      <EventForm
        initialData={eventData}
        onSubmit={handleUpdate}
      />
    </div>
  );
}