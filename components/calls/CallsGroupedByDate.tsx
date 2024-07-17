import CallOverview from "@/components/calls/CallOcerview";
import { ActivityWithCounts } from "@/src/types/activity";
import { format } from "date-fns/format";
import React from "react";

interface CallsWithinDateProps {
  date: string;
  callsWithinDate: ActivityWithCounts[];
}

const CallsWithinDate: React.FC<CallsWithinDateProps> = ({
  date,
  callsWithinDate,
}) => {
  const formattedDate = format(new Date(date), "MMM, dd yyyy").toUpperCase();

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-sm font-medium tracking-wide text-gray-500">
        {formattedDate}
      </div>
      {callsWithinDate.map((call) => (
        <CallOverview activity={call} key={call.id} />
      ))}
    </div>
  );
};

export default CallsWithinDate;
