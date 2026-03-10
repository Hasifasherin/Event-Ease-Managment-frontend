"use client";

import { useEffect, useState } from "react";
import { getSliders } from "@/services/publicService";

export default function HeroSlider() {
  const [slides, setSlides] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getSliders();
      setSlides(data);
    };
    fetch();
  }, []);

  if (!slides.length) return null;

  return (
    <div className="w-full">

      <div className="h-[420px] w-full overflow-hidden">

        <img
          src={slides[0].imageUrl}
          className="w-full h-full object-cover"
        />

      </div>

    </div>
  );
}