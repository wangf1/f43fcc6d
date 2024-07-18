"use client";

import CallsWithinDate from "@/components/calls/CallsGroupedByDate";
import {
  fetchActivities,
  updateActivity,
} from "@/src/data/activities/activitiesSlice";
import { useAppDispatch, useAppSelector } from "@/src/data/hooks";
import { getLatestCallsWithCountsGroupByDate } from "@/src/data/process_data";
import { RootState } from "@/src/data/store";
import { ActivityWithCounts } from "@/src/types/activity";
import { Archive } from "lucide-react";
import { useEffect, useState } from "react";

const ActivityFeed = () => {
  // const [activities, setActivities] = useState<ActivityWithCounts[]>([]);

  const activities = useAppSelector(
    (state: RootState) => state.activities.activities
  );

  const [activitiesGroupByDate, setActivitiesGroupByDate] = useState<
    [string, ActivityWithCounts[]][]
  >([]);

  const status = useAppSelector((state: RootState) => state.activities.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  useEffect(() => {
    const groupedByDate = getLatestCallsWithCountsGroupByDate(
      activities,
      false
    );
    setActivitiesGroupByDate(groupedByDate);
  }, [activities]);

  if (status === "loading") {
    return <p>Loading activities...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load activities.</p>;
  }

  function onArchiveAll(): void {
    for (const activity of activities) {
      dispatch(updateActivity({ activity, is_archived: true }));
    }
  }

  return (
    <div className="mx-auto min-w-96 shadow rounded-lg">
      <header
        className="flex justify-items-start items-center mb-4
        space-x-4"
      >
        <button
          onClick={() => onArchiveAll()}
          className="flex items-center space-x-3 font-semibold
            text-gray-700 px-4 py-2  rounded-md hover:bg-blue-500
            hover:text-white focus:outline-none focus:border-blue-300"
        >
          <Archive size={24} className="text-gray-500" />
          <div>Archive all calls</div>
        </button>
      </header>
      <div className="space-y-4">
        {activitiesGroupByDate.map((activitiesWithinDate) => (
          <CallsWithinDate
            key={activitiesWithinDate[0]}
            callsWithinDate={activitiesWithinDate[1]}
            date={activitiesWithinDate[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
