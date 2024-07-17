import { Activity, ActivityWithCounts } from "@/src/types/activity";

interface CallCounts {
  count: number;
  activity: Activity;
}

export function getLatestCallsWithCounts(
  calls: Activity[]
): ActivityWithCounts[] {
  const latestCallsMap = new Map<string, CallCounts>();

  for (const call of calls) {
    const { direction, from, to, created_at } = call;
    const key = direction === "inbound" ? `${to}_${from}` : `${from}_${to}`;
    const existingCall = latestCallsMap.get(key);
    const isNewer =
      existingCall &&
      new Date(created_at) > new Date(existingCall.activity.created_at);

    if (!existingCall || isNewer) {
      latestCallsMap.set(key, {
        count: (existingCall?.count || 0) + 1,
        activity: call,
      });
    } else {
      existingCall.count += 1;
    }
  }

  return Array.from(latestCallsMap.values()).map(({ activity, count }) => ({
    ...activity,
    calls_count: count,
  }));
}
