"use client";

import { Phone, Settings, UserRound } from "lucide-react";
import { MdDialpad } from "react-icons/md";

import { fetchActivities } from "@/src/data/activities/activitiesSlice";
import { useAppDispatch, useAppSelector } from "@/src/data/hooks";
import { getMissedCallCount } from "@/src/data/process_data";
import { useEffect } from "react";

export default function Footer() {
  const activities = useAppSelector((state) => state.activities.activities);
  const status = useAppSelector((state) => state.activities.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading activities...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load activities.</p>;
  }

  const missedCallCount = getMissedCallCount(activities, false);

  return (
    <div className="flex items-center justify-center p-4 space-x-6">
      <div
        className="flex relative after:absolute after:left-0 
        after:bottom-[-20px] after:w-full after:h-[4px]
        after:bg-green-500"
      >
        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {missedCallCount}
        </div>
        <Phone size={24} />
      </div>
      <UserRound size={24} />
      <div className="bg-green-500 p-3 rounded-full">
        <MdDialpad size={48} className="text-white" />
      </div>
      <Settings size={24} />
      <div
        className="rounded-full border-2 border-gray-200 w-6 h-6
          flex items-center justify-center"
      >
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
    </div>
  );
}
