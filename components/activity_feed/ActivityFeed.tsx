"use client";

import CallsWithinDate from "@/components/calls/CallsGroupedByDate";
import { fetchActivities } from "@/src/data/activities/activitiesSlice";
import { getLatestCallsWithCountsGroupByDate } from "@/src/data/process_data";
import { AppDispatch, RootState } from "@/src/data/store";
import { Archive } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ActivityFeed = () => {
  const activities = useSelector(
    (state: RootState) => state.activities.activities
  );
  const status = useSelector((state: RootState) => state.activities.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading activities...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load activities.</p>;
  }

  const callsGroupByDate = getLatestCallsWithCountsGroupByDate(activities);

  return (
    <div className="mx-auto shadow rounded-lg">
      <header
        className="flex justify-items-start items-center mb-4
        space-x-4"
      >
        <Archive size={24} className="text-gray-500" />
        <button className="font-semibold text-gray-700">
          Archive all calls
        </button>
      </header>
      <div className="space-y-4">
        {callsGroupByDate.map((callsWithinDate) => (
          <CallsWithinDate
            key={callsWithinDate[0]}
            callsWithinDate={callsWithinDate[1]}
            date={callsWithinDate[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
