export default function APIKeySkeleton() {
  return (
    <>
      <div className="shadow rounded-md py-2 w-[34%]">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-9 bg-slate-700 py-2 px-4 w-[100%] mt-4 mb-6 rounded-lg"></div>
            <div className="h-9 bg-slate-700 py-2 px-4 w-[100%] my-6 rounded-lg"></div>
            <div className="h-9 bg-slate-700 py-2 px-4 w-[100%] my-6 rounded-lg"></div>
            <div className="h-9 bg-slate-700 py-2 px-4 w-[100%] my-6 rounded-lg"></div>
          </div>
        </div>
      </div>
    </>
  );
}
