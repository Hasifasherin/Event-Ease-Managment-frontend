"use client";

import { useEffect, useState } from "react";
import { getEvents } from "@/services/publicService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "./LoginModal";

interface EventType {
  category: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      const events = (await getEvents()) as EventType[];
      const unique = [...new Set(events.map((e) => e.category))];
      setCategories(unique);
    };
    fetch();
  }, []);

  const handleClick = (cat: string) => {
    if (!user) {
      setShowModal(true);
      return;
    }
    router.push(`/category/${cat}`);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => handleClick(cat)}
            className="group relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-md p-6 text-center cursor-pointer overflow-hidden border border-blue-300 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            {/* Optional Icon or Emoji */}
            

            <h3 className="font-semibold text-gray-800 text-lg md:text-xl">
              {cat}
            </h3>

            {/* Animated overlay on hover */}
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
          </div>
        ))}
      </div>

      {/* Login Modal */}
<LoginModal 
  open={showModal} 
  onClose={() => setShowModal(false)} 
/>    </>
  );
}