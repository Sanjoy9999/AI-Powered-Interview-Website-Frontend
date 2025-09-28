import React from "react";

const SkeletonLoader = () => {
  const block = "rounded-md bg-gray-100 dark:bg-gray-600";
  const line = "h-3 rounded bg-gray-100 dark:bg-gray-600";
  const subtle = "h-2.5 rounded bg-gray-200/70 dark:bg-gray-500/60";

  return (
    <>
      <div role="status" className="animate-pulse space-y-5 max-w-3xl">
        <div className={`h-4 w-1/2 ${block}`}></div>

        <div className="space-y-2">
          <div className={`${line} w-full`}></div>
          <div className={`${line} w-11/12`}></div>
          <div className={`${line} w-10/12`}></div>
          <div className={`${line} w-9/12`}></div>
        </div>

        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/60 space-y-2 border border-gray-100 dark:border-gray-600">
          <div className={`${subtle} w-3/4`}></div>
          <div className={`${subtle} w-2/3`}></div>
          <div className={`${subtle} w-1/2`}></div>
        </div>
      </div>

      <div role="status" className="animate-pulse space-y-5 max-w-3xl mt-10">
        <div className={`h-4 w-1/2 ${block}`}></div>

        <div className="space-y-2">
          <div className={`${line} w-full`}></div>
          <div className={`${line} w-11/12`}></div>
          <div className={`${line} w-10/12`}></div>
          <div className={`${line} w-9/12`}></div>
        </div>

        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/60 space-y-2 border border-gray-100 dark:border-gray-600">
          <div className={`${subtle} w-3/4`}></div>
          <div className={`${subtle} w-2/3`}></div>
        </div>

        <div className={`h-4 w-1/2 ${block} mt-8`}></div>

        <div className="space-y-2">
          <div className={`${line} w-full`}></div>
          <div className={`${line} w-11/12`}></div>
          <div className={`${line} w-10/12`}></div>
          <div className={`${line} w-9/12`}></div>
        </div>
      </div>
    </>
  );
};

export default SkeletonLoader;
