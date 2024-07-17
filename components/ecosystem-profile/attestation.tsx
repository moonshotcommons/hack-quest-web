import { SearchIcon } from 'lucide-react';

export function Attestation() {
  return (
    <div className="mt-2 flex flex-col gap-5 bg-neutral-white px-5 py-4 sm:mt-16 sm:gap-8 sm:p-0">
      <h2 className="font-next-book-bold text-lg font-bold text-neutral-off-black sm:text-[22px]">Attestation</h2>
      <form className="flex h-[38px] w-full items-center gap-2 rounded-full border border-neutral-light-gray px-3 py-2 transition-colors duration-300 focus-within:border-neutral-medium-gray">
        <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        <input
          className="h-full flex-1 bg-transparent text-sm outline-none"
          type="text"
          placeholder="Search for attestation"
        />
      </form>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-3 sm:gap-6">
          <span className="text-sm font-bold sm:text-base">Certificate</span>
          <span className="text-sm font-bold sm:text-base">Certificate</span>
          <span className="text-sm font-bold sm:text-base">Certificate</span>
          <span className="text-sm font-bold sm:text-base">Certificate</span>
        </div>
        <div className="grid grid-cols-4 gap-3 sm:gap-6">
          <span className="truncate text-sm sm:text-base">Sui Developer</span>
          <span className="truncate text-sm underline sm:text-base">Sui Foundation</span>
          <span className="truncate text-sm underline sm:text-base">Cameron Wang</span>
          <span className="truncate text-sm sm:text-base">1h ago</span>
        </div>
        <div className="grid grid-cols-4 gap-3 sm:gap-6">
          <span className="truncate text-sm sm:text-base">Sui Developer</span>
          <span className="truncate text-sm underline sm:text-base">Sui Foundation</span>
          <span className="truncate text-sm underline sm:text-base">Cameron Wang</span>
          <span className="truncate text-sm sm:text-base">1h ago</span>
        </div>
      </div>
    </div>
  );
}
