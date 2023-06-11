import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React from "react";

interface PaginationProps {
  currentPage: number | undefined;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}
/** Component for pagination. Used in search component */
export default function Pagination(props: PaginationProps) {
  return (
    <div className="w-full flex justify-center">
      <button
        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        onClick={props.goToPrevPage}
      >
        <span className="sr-only">Previous button</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <p className="relative inline-flex items-center px-4 py-2 text-orange-500 ring-1 ring-inset ring-gray-300 cursor-default">
        <span className="sr-only">Current Page</span>
        {props.currentPage}
      </p>
      <button
        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        onClick={props.goToNextPage}
      >
        <span className="sr-only">Next button</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
