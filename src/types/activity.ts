export interface Activity {
  direction: "inbound" | "outbound";
  from: number;
  to: number;
  via: number;
  duration: number;
  is_archived: boolean;
  call_type: "answered" | "missed";
  id: string;
  created_at: string;
}

export interface ActivityWithCounts extends Activity {
  calls_count: number;
}
