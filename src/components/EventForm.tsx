"use client";

import { useState, useEffect } from "react";

interface Props {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function EventForm({ onSubmit, initialData }: Props) {

  const [form, setForm] = useState<any>({
    title: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    time: "",
    location: "",
    eventType: "offline",
    bannerImage: null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  /* ✅ Load existing data when editing */
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        category: initialData.category || "",
        startDate: initialData.startDate
          ? initialData.startDate.split("T")[0]
          : "",
        endDate: initialData.endDate
          ? initialData.endDate.split("T")[0]
          : "",
        time: initialData.time || "",
        location: initialData.location || "",
        eventType: initialData.eventType || "offline",
        bannerImage: null,
      });

      // ✅ Show existing image as preview
      if (initialData.bannerImage) {
        setPreview(initialData.bannerImage);
      }
    }
  }, [initialData]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setForm({ ...form, bannerImage: file });

      // ✅ Show new image preview
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-md"
    >

      {/* ✅ Image Preview */}
      {preview && (
        <div>
          <img
            src={preview}
            className="w-60 h-32 object-cover rounded-lg"
          />
        </div>
      )}

      <input
        name="title"
        placeholder="Event Title"
        className="w-full border p-2 rounded"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="w-full border p-2 rounded"
        value={form.description}
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Category"
        className="w-full border p-2 rounded"
        value={form.category}
        onChange={handleChange}
      />

      <input
        type="date"
        name="startDate"
        className="w-full border p-2 rounded"
        value={form.startDate}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="endDate"
        className="w-full border p-2 rounded"
        value={form.endDate}
        onChange={handleChange}
        required
      />

      <input
        name="time"
        placeholder="Event Time"
        className="w-full border p-2 rounded"
        value={form.time}
        onChange={handleChange}
      />

      <input
        name="location"
        placeholder="Location"
        className="w-full border p-2 rounded"
        value={form.location}
        onChange={handleChange}
      />

      <select
        name="eventType"
        className="w-full border p-2 rounded"
        value={form.eventType}
        onChange={handleChange}
      >
        <option value="offline">Offline</option>
        <option value="online">Online</option>
      </select>

      {/* ✅ File Upload */}
      <input
        type="file"
        onChange={handleFile}
        className="w-full border p-2"
        accept="image/*"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition"
      >
        {initialData ? "Update Event" : "Create Event"}
      </button>

    </form>
  );
}