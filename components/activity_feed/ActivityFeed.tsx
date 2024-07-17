// src/components/CallActivity.js
import CallsWithinDate from "@/components/calls/CallsGroupedByDate";
import { getLatestCallsWithCountsGroupByDate } from "@/src/data/process_data";
import { calls } from "@/src/data/sample_data";
import { Archive } from "lucide-react";

const callsGroupByDate = getLatestCallsWithCountsGroupByDate(calls);

const ActivityFeed = () => {
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
