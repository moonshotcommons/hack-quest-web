import { UploadIcon } from 'lucide-react';
import { RemoveFile } from '../modals/remove-file-modal';

export function Resume() {
  return (
    <div className="mt-2 flex flex-col gap-5 bg-neutral-white px-5 py-4 sm:mt-12 sm:gap-8 sm:p-0">
      <h2 className="font-next-book-bold text-lg font-bold text-neutral-off-black sm:text-[22px]">Resume</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="relative flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-dashed border-neutral-medium-gray p-4">
          <input type="file" className="hidden" />
          <button className="outline-none">
            <UploadIcon size={20} className="text-neutral-rich-gray" />
            <span className="body-s text-neutral-rich-gray">Upload file</span>
          </button>
          <RemoveFile />
        </div>
      </div>
    </div>
  );
}
