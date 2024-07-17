import PhoneIcon from "@/components/calls/PhoneIcon";
import { ActivityWithCounts } from "@/src/types/activity";
import { format } from "date-fns/format";

const CallOverview: React.FC<{ activity: ActivityWithCounts }> = ({
  activity,
}) => {
  const time = format(new Date(activity.created_at), "hh:mm a");
  const phoneNumber =
    activity.direction === "outbound" ? activity.to : activity.from;
  const answered = activity.call_type === "answered";

  return (
    <div className="flex min-w-72 px-4 py-2 border rounded-xl shadow-sm">
      <PhoneIcon activity={activity} />
      <div
        className="text-sm font-bold text-gray-900
          dark:text-gray-100"
      >
        <div className="flex space-x-2 gap-2">
          {phoneNumber}
          <div
            className={`flex items-center justify-center rounded-full
              text-white text-xs w-4 h-4 p-1
              ${answered ? "bg-blue-500" : "bg-red-500"}`}
          >
            {activity.calls_count}
          </div>
        </div>
      </div>
      <div className="ml-auto text-sm text-gray-500">{time}</div>
    </div>
  );
};

export default CallOverview;
