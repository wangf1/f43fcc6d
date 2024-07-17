// src/components/CallActivity.js
import CallOverview from "@/components/calls/CallOcerview";
import { getLatestCallsWithCounts } from "@/src/data/convert_data";
import { calls } from "@/src/data/sample_data";

const callsWithCounts = getLatestCallsWithCounts(calls);

const CallActivity = () => {
  return (
    <div className="max-w-lg mx-auto p-4 shadow rounded-lg">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Activity</h2>
        <button className="text-blue-500">Archive all calls</button>
      </header>
      <div className="space-y-4">
        {callsWithCounts.map((call) => (
          <CallOverview activity={call} key={call.id} />
        ))}
      </div>
    </div>
  );
};

export default CallActivity;
