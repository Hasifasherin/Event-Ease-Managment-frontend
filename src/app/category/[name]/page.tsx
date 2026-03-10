"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getEvents } from "@/services/publicService";
import EventGrid from "@/components/EventGrid";

export default function CategoryPage(){

  const { name } = useParams();
  const [events,setEvents]=useState<any[]>([]);

  useEffect(()=>{

    const fetchEvents = async()=>{

      const data = await getEvents({
        category: name
      });

      setEvents(data);
    };

    fetchEvents();

  },[name]);

  return(

    <div className="max-w-6xl mx-auto mt-10">

      <h1 className="text-2xl font-bold mb-6">
        {name} Events
      </h1>

      <EventGrid events={events}/>

    </div>
  );
}