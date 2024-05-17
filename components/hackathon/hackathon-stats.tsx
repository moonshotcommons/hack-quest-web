export function HackathonStats() {
  return (
    <div>
      <h1 className="font-next-book-bold text-lg font-bold text-neutral-black">Your Hackathon Stats</h1>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-4">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-light text-neutral-rich-gray">Hackathon Registered</p>
          <p className="body-l-bold text-neutral-off-black">0</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-light text-neutral-rich-gray">Hackathon Submitted</p>
          <p className="body-l-bold text-neutral-off-black">0</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-light text-neutral-rich-gray">Winner Project</p>
          <p className="body-l-bold text-neutral-off-black">0</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-light text-neutral-rich-gray">Project Voted</p>
          <p className="body-l-bold text-neutral-off-black">0</p>
        </div>
      </div>
    </div>
  );
}
