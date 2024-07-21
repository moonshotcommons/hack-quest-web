import * as React from 'react';
import Image from 'next/image';
import { PlusIcon } from 'lucide-react';

export function ConnectApp() {
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      <div className="flex items-center rounded-2xl border border-neutral-medium-gray p-4">
        <Image src="/images/profile/degenscore.svg" width={32} height={32} alt="Degenscore" />
        <div className="ml-4 flex flex-col">
          <h4 className="font-bold">Degenscore</h4>
          <p className="text-xs text-neutral-rich-gray">evan976</p>
        </div>
        <button className="ml-auto outline-none">
          <PlusIcon size={20} className="text-neutral-medium-gray" />
        </button>
      </div>
      <div className="flex items-center rounded-2xl border border-neutral-medium-gray p-4">
        <Image src="/images/profile/aspecta.svg" width={32} height={32} alt="Aspecta ID" />
        <div className="ml-4 flex flex-col">
          <h4 className="font-bold">Aspecta ID</h4>
          <p className="text-xs text-neutral-rich-gray">evan976</p>
        </div>
        <button className="ml-auto outline-none">
          <PlusIcon size={20} className="text-neutral-medium-gray" />
        </button>
      </div>
      <div className="flex items-center rounded-2xl border border-neutral-medium-gray p-4">
        <Image src="/images/profile/link3.svg" width={32} height={32} alt="Link3 ID" />
        <div className="ml-4 flex flex-col">
          <h4 className="font-bold">Link3 ID</h4>
          <p className="text-xs text-neutral-rich-gray">evan976</p>
        </div>
        <button className="ml-auto outline-none">
          <PlusIcon size={20} className="text-neutral-medium-gray" />
        </button>
      </div>
      <div className="flex items-center rounded-2xl border border-neutral-medium-gray p-4">
        <Image src="/images/profile/gitcoin-passport.png" width={32} height={32} alt="Gitcoin Passport" />
        <div className="ml-4 flex flex-col">
          <h4 className="font-bold">Gitcoin Passport</h4>
          <p className="text-xs text-neutral-rich-gray">evan976</p>
        </div>
        <button className="ml-auto outline-none">
          <PlusIcon size={20} className="text-neutral-medium-gray" />
        </button>
      </div>
    </div>
  );
}
