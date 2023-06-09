import { XMarkIcon } from "@heroicons/react/20/solid";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import React from "react";

interface BadgeProps {
  selected: boolean;
  message: string;
  callback: (string: string, selected: boolean) => void;
}

export default function Badge({selected, message, callback} : BadgeProps) {
  return (
      <div className={`inline-flex items-center rounded-md ${selected ? "bg-green-200": "bg-gray-50"} px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 cursor-pointer`} onClick={() => callback(message, selected)}>
        <p>{message}</p>
        {selected && <CheckBadgeIcon className="h-4 w-auto ml-2"/>}
      </div>
  );
}
