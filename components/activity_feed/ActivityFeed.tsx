// src/components/CallActivity.js
import CallsWithinDate from "@/components/calls/CallsGroupedByDate";
import { getLatestCallsWithCountsGroupByDate } from "@/src/data/convert_data";
import { calls } from "@/src/data/sample_data";
import { Phone } from "lucide-react";

const callsGroupByDate = getLatestCallsWithCountsGroupByDate(calls);

const CallActivity = () => {
  return (
    <div className="max-w-lg mx-auto p-4 shadow rounded-lg">
      <header
        className="flex justify-items-start items-center mb-4
        space-x-4"
      >
        <div className="flex items-center justify-center w-12 h-12 border-4 border-green-500 rounded-full text-green-500">
          <Phone size={24} />
        </div>
        <h2 className="text-xl font-semibold">Activity</h2>
        <button className="text-blue-500">Archive all calls</button>
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

export default CallActivity;
