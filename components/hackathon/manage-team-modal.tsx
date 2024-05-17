'use client';

import * as React from 'react';
import Link from 'next/link';
import { InfoIcon, MoveRightIcon, Trash2Icon, XIcon } from 'lucide-react';
import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { CopyIcon } from '@/components/Common/Icon/CopyV2';
import { HACKQUEST_DISCORD } from '@/constants/links';

function TeamMemberCard({ owner = false }: { owner?: boolean }) {
  return (
    <div className="flex w-full items-center border-b border-b-neutral-light-gray py-2">
      <div className="h-9 w-9 rounded-full bg-neutral-light-gray"></div>
      <span className="body-m ml-2 text-neutral-off-black">Evan {owner && '(You)'}</span>
      {owner ? (
        <span className="body-m ml-auto text-neutral-medium-gray">Admin</span>
      ) : (
        <button className="ml-auto text-sm text-neutral-rich-gray underline outline-none">Remove Teammate</button>
      )}
    </div>
  );
}

export function ManageTeamModal({ open, onClose }: { open?: boolean; onClose: () => void }) {
  return (
    <Modal open={true} onClose={onClose}>
      <div className="relative flex w-[50.375rem] flex-col items-center gap-3 rounded-2xl bg-neutral-white px-10 py-[3.75rem] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
        <button aria-label="Close Modal" className="absolute right-5 top-5 outline-none">
          <XIcon size={20} />
        </button>
        <div className="flex w-full items-center justify-between">
          <h1 className="body-xl-bold text-neutral-off-black">Spiderman</h1>
          <button className="inline-flex items-center gap-1 text-neutral-rich-gray">
            <Trash2Icon size={16} />
            <span className="text-sm underline">Delete Team</span>
          </button>
        </div>
        <div className="flex w-full items-center rounded-2xl bg-neutral-off-white p-4 text-neutral-medium-gray">
          <InfoIcon size={16} />
          <span className="ml-1 text-sm">
            This hackathon let’s you have upto 5 teammates. Share the code below to add teammates.
          </span>
        </div>
        <div className="w-full">
          <h2 className="mb-1 text-base text-neutral-rich-gray">Team Code</h2>
          <div className="flex w-full items-center justify-between rounded-[0.5rem] bg-yellow-extra-light px-6 py-3">
            <span className="text-base text-neutral-off-black">HX56QSDFDSC</span>
            <button aria-label="Copy Team Code" className="text-neutral-medium-gray outline-none">
              <CopyIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="w-full">
          <h2 className="mb-1 text-base text-neutral-rich-gray">Team Members (4)</h2>
          <div className="w-full">
            <TeamMemberCard owner />
            <TeamMemberCard />
            <TeamMemberCard />
            <TeamMemberCard />
          </div>
        </div>
        <div className="my-[2.125rem] flex w-full items-center justify-between">
          <p className="text-sm font-light text-neutral-off-black">
            Are you looking for a teammate? Follow HackQuest Discord to find your dream team!
          </p>
          <Link
            href={HACKQUEST_DISCORD}
            target="_blank"
            rel="noreferrer"
            className="relative inline-flex items-center gap-1.5 text-sm text-neutral-off-black after:absolute after:bottom-0 after:h-0.5 after:w-full after:rounded-full after:bg-yellow-dark"
          >
            <span>Go to Discord</span>
            <MoveRightIcon size={16} />
          </Link>
        </div>
        <Button className="w-60 uppercase" type="primary">
          Save & Close
        </Button>
      </div>
    </Modal>
  );
}
