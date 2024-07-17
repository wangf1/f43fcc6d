import { Phone, Settings, UserRound } from "lucide-react";
import { MdDialpad } from "react-icons/md";

import { getMissedCallCount } from "@/src/data/process_data";
import { calls } from "@/src/data/sample_data";

export default function Footer() {
  const missedCallCount = getMissedCallCount(calls);

  return (
    <div className="flex items-center justify-center p-4 space-x-6">
      <div
        className="flex relative after:absolute after:left-0 
        after:bottom-[-20px] after:w-full after:h-[4px]
        after:bg-green-500"
      >
        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {missedCallCount}
        </div>
        <Phone size={24} />
      </div>
      <UserRound size={24} />
      <div className="bg-green-500 p-3 rounded-full">
        <MdDialpad size={48} className="text-white" />
      </div>
      <Settings size={24} />
      <div
        className="rounded-full border-2 border-gray-200 w-6 h-6
          flex items-center justify-center"
      >
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
    </div>
  );
}
