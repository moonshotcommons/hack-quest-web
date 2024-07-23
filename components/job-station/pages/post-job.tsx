import { XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <main className="relative mx-auto flex h-full w-full flex-col justify-between bg-neutral-white py-12">
      <button className="absolute right-6 top-6 outline-none">
        <XIcon size={28} />
      </button>
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-center font-next-book-bold text-[22px] font-bold sm:text-[28px]">Post a Web3 Position</h1>
      </div>
      <Button className="w-full sm:w-[270px] sm:self-end">Continue</Button>
    </main>
  );
}
