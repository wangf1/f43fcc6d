"use client";

import CallsWithinDate from "@/components/calls/CallsGroupedByDate";
import { Button } from "@/components/ui/button";
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

interface ActivityListProps {
  includingArchived: boolean;
}

const ActivityList: React.FC<ActivityListProps> = ({ includingArchived }) => {
  const isInAllCallsPage = includingArchived;

  const activities = useAppSelector(
    (state: RootState) => state.activities.activities
  );

  const [activitiesGroupByDate, setActivitiesGroupByDate] = useState<
    [string, ActivityWithCounts[]][]
  >([]);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const status = useAppSelector((state: RootState) => state.activities.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  useEffect(() => {
    const groupedByDate = getLatestCallsWithCountsGroupByDate(
      activities,
      includingArchived
    );
    setActivitiesGroupByDate(groupedByDate);

    const btnDisabled = !isInAllCallsPage && groupedByDate.length === 0;
    setButtonDisabled(btnDisabled);
  }, [activities, includingArchived, isInAllCallsPage]);

  if (status === "loading") {
    return <p>Loading activities...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load activities.</p>;
  }

  function onArchiveOrUnarchiveAll(): void {
    // in the All Calls page, we want to unarchive all calls
    // in the Inbox page, we want to archive all calls
    const isArchived = !isInAllCallsPage;

    for (const activity of activities) {
      dispatch(updateActivity({ activity, is_archived: isArchived }));
    }
  }

  return (
    <div className="mx-auto min-w-96 shadow rounded-lg">
      <header
        className="flex justify-items-start items-center mb-4
        space-x-4"
      >
        <Button
          variant="ghost"
          disabled={buttonDisabled}
          onClick={() => onArchiveOrUnarchiveAll()}
          className={`flex items-center space-x-3 font-semibold px-4 py-2 rounded-md 
    focus:outline-none focus:border-blue-300 active:bg-gray-500
    ${
      buttonDisabled
        ? "text-gray-700 bg-gray-200"
        : "text-gray-700 hover:bg-blue-500 hover:text-white transition-colors duration-300"
    }`}
        >
          <Archive size={24} className="text-gray-500" />
          <div>
            {isInAllCallsPage ? "Unarchive all calls" : "Archive all calls"}
          </div>
        </Button>
      </header>
      <div className="space-y-4">
        {activitiesGroupByDate.length === 0 ? (
          <p className="max-w-96 text-gray-400">
            All calls are archived. See all calls including archived ones in the
            All calls tab.
          </p>
        ) : (
          activitiesGroupByDate.map((activitiesWithinDate) => (
            <CallsWithinDate
              key={activitiesWithinDate[0]}
              callsWithinDate={activitiesWithinDate[1]}
              date={activitiesWithinDate[0]}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityList;
