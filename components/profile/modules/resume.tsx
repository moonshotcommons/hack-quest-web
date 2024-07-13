import { UploadIcon } from 'lucide-react';

export function Resume() {
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    console.log(file);
  }

  return (
    <div className="mt-2 flex flex-col gap-5 bg-neutral-white px-5 py-4 sm:mt-12 sm:gap-8 sm:p-0">
      <h2 className="font-next-book-bold text-lg font-bold text-neutral-off-black sm:text-[22px]">Resume</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="group relative flex w-full items-center justify-center gap-2.5 rounded-xl border border-dashed border-neutral-medium-gray p-4 transition-colors duration-300 hover:border-neutral-black">
          <label className="absolute inset-0 h-full w-full cursor-pointer opacity-0 group-hover:opacity-100">
            <input type="file" accept="application/*" className="hidden" onChange={onChange} />
          </label>
          <button className="inline-flex items-center justify-center gap-2 outline-none">
            <UploadIcon size={20} className="text-neutral-rich-gray" />
            <span className="body-s text-neutral-rich-gray">Upload file</span>
          </button>
        </div>
      </div>
    </div>
  );
}
