"use client";

import { useEffect, useState } from "react";
import { getEvents } from "@/services/publicService";
import EventGrid from "./EventGrid";

export default function EventTabs(){

  const [events,setEvents]=useState<any[]>([]);
  const [tab,setTab]=useState("all");

  useEffect(()=>{

    const fetch=async()=>{

      let params:any={};

      if(tab==="today") params.status="ongoing";
      if(tab==="week") params.status="upcoming";

      const data=await getEvents(params);
      setEvents(data);

    };

    fetch();

  },[tab]);

  return(

    <div className="mt-10">

      <h2 className="text-2xl font-semibold mb-6">
        Browse Events
      </h2>

      <div className="flex gap-3 mb-8">

        <button
          onClick={()=>setTab("all")}
          className={`px-4 py-2 rounded-full border ${
            tab==="all" ? "bg-blue-600 text-white" : "hover:bg-gray-100"
          }`}
        >
          All
        </button>

        <button
          onClick={()=>setTab("today")}
          className={`px-4 py-2 rounded-full border ${
            tab==="today" ? "bg-blue-600 text-white" : "hover:bg-gray-100"
          }`}
        >
          Today
        </button>

        <button
          onClick={()=>setTab("week")}
          className={`px-4 py-2 rounded-full border ${
            tab==="week" ? "bg-blue-600 text-white" : "hover:bg-gray-100"
          }`}
        >
          This Week
        </button>

      </div>

      <EventGrid events={events}/>

    </div>
  );
}