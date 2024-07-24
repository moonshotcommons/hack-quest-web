import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MoveRightIcon } from 'lucide-react';
import { ConnectApp } from './connect-app';

export function ConnectAppModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 text-sm text-neutral-black outline-none">
          Connect Apps
          <MoveRightIcon size={16} />
        </button>
      </DialogTrigger>
      <DialogContent className="flex h-screen flex-col gap-0 px-5 py-0 sm:h-auto sm:w-[900px] sm:max-w-[900px] sm:gap-6 sm:p-12">
        <DialogHeader>
          <DialogTitle className="text-left sm:text-[22px]">
            Generate your Web3 Builder Profile by Connect Apps
          </DialogTitle>
        </DialogHeader>
        <ConnectApp />
        <Button className="w-full self-end sm:mt-20 sm:w-[270px]">Continue</Button>
      </DialogContent>
    </Dialog>
  );
}
