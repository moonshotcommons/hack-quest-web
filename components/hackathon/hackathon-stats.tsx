export function HackathonStats({
  registered,
  submitted,
  winner,
  projectVoted
}: {
  registered: number;
  submitted: number;
  winner: number;
  projectVoted: number;
}) {
  return (
    <div>
      <h1 className="font-next-book-bold text-lg font-bold text-neutral-black">Your Hackathon Stats</h1>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-4">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-light text-neutral-rich-gray">Hackathon Registered</p>
          <p className="body-l-bold text-neutral-off-black">{registered}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-light text-neutral-rich-gray">Hackathon Submitted</p>
          <p className="body-l-bold text-neutral-off-black">{submitted}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-light text-neutral-rich-gray">Winner Project</p>
          <p className="body-l-bold text-neutral-off-black">{winner}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-light text-neutral-rich-gray">Project Voted</p>
          <p className="body-l-bold text-neutral-off-black">{projectVoted}</p>
        </div>
      </div>
    </div>
  );
}
