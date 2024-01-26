import React from "react";

export default function UsernameSkeleton() {
  return (
    <>
      <div className="shadow rounded-md py-2 w-[100%]">
        <div className="animate-pulse flex">
          <div className="flex-1">
            <div className="h-8 bg-slate-700 w-[100%] rounded-lg"></div>
          </div>
        </div>
      </div>
    </>
  );
}
