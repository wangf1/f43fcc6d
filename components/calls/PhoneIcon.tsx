import { Activity } from "@/src/types/activity";
import { Phone, PhoneIncoming, PhoneOutgoing } from "lucide-react";
import React from "react";

const getCallIcon = (direction: Activity["direction"]) => {
  if (direction === "inbound") {
    return PhoneIncoming;
  } else if (direction === "outbound") {
    return PhoneOutgoing;
  } else {
    return Phone;
  }
};

const getCallColor = (call_type: Activity["call_type"]) => {
  if (call_type === "answered") {
    return "green";
  } else if (call_type === "missed") {
    return "red";
  } else {
    return "gray";
  }
};

// Example usage in a component
const PhoneIcon: React.FC<{ activity: Activity }> = ({ activity }) => {
  const Icon = getCallIcon(activity.direction);
  const color = getCallColor(activity.call_type);
  const colorClass = {
    green: "text-green-500",
    red: "text-red-500",
    gray: "text-gray-500",
  };

  return <Icon className={colorClass[color]} />;
};

export default PhoneIcon;
