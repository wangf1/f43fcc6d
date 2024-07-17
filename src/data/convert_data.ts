import { Activity, ActivityWithCounts } from "@/src/types/activity";

interface CallCounts {
  count: number;
  activity: Activity;
}

function getLatestCallsWithCounts(calls: Activity[]): ActivityWithCounts[] {
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

  const unsorted = Array.from(latestCallsMap.values()).map(
    ({ activity, count }) => ({
      ...activity,
      calls_count: count,
    })
  );

  return unsorted;
}

function formatDateWithoutTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

export function getLatestCallsWithCountsGroupByDate(
  calls: Activity[]
): [string, ActivityWithCounts[]][] {
  const activitiesWithCounts = getLatestCallsWithCounts(calls);

  const groupedByDateMap = new Map<string, ActivityWithCounts[]>();

  for (const activity of activitiesWithCounts) {
    const dateWithoutTime = formatDateWithoutTime(activity.created_at);

    if (!groupedByDateMap.has(dateWithoutTime)) {
      groupedByDateMap.set(dateWithoutTime, []);
    }

    groupedByDateMap.get(dateWithoutTime)!.push(activity);
  }

  for (const [date, activities] of groupedByDateMap) {
    activities.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  const sortedEntries = Array.from(groupedByDateMap.entries()).sort(
    ([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime()
  );

  return sortedEntries;
}
