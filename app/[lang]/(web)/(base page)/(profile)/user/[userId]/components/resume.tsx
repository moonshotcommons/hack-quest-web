import { UploadIcon } from 'lucide-react';

export default function Resume() {
  return (
    <div className="mt-12 flex flex-col gap-8">
      <h2 className="font-next-book-bold text-[22px] font-bold text-neutral-off-black">Resume</h2>
      <div className="grid grid-cols-3 gap-5">
        <button className="relative flex w-full items-center justify-center gap-2.5 rounded-xl border border-dashed border-neutral-medium-gray p-4">
          <UploadIcon size={20} className="text-neutral-rich-gray" />
          <span className="body-s text-neutral-rich-gray">Upload file</span>
        </button>
      </div>
    </div>
  );
}
