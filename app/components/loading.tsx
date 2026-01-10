import React from "react";

export default function Loading() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        <div className="h-10 w-10 sm:h-12 sm:w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>

        <p className="text-xs sm:text-sm font-medium text-gray-600 text-center">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
