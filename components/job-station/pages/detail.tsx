'use client';

import { motion } from 'framer-motion';
import { BookmarkIcon, Clock4Icon, MapPinIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Back } from '../components/back';

export default function Page() {
  return (
    <main className="flex h-full min-h-[calc(100vh-64px)] w-full flex-col bg-neutral-off-white pt-10 sm:bg-neutral-white sm:pt-12">
      <div className="w-full flex-1 space-y-5 px-5 sm:mx-auto sm:max-w-5xl sm:space-y-6 sm:px-0">
        <Back />
        <h1 className="text-2xl font-bold">Senior Blockchain Infrastructure Engineer (DevOps/Golang)</h1>
        <div className="flex items-center gap-3">
          <div className="relative h-6 w-6 overflow-hidden rounded-full bg-green-500"></div>
          <h3 className="text-lg text-neutral-rich-gray">Google</h3>
        </div>
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2">
            <span>$</span>
            <span>200-300k USD</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock4Icon className="h-5 w-5" />
            <span>Full-time</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5" />
            <span>Remote</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Badge size="large">Remote</Badge>
          <Badge size="large">Smart Contract</Badge>
          <Badge size="large">Bloackchain</Badge>
        </div>
      </div>
      <motion.footer
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'tween', ease: 'easeOut' }}
        className="flex h-[72px] w-full shrink-0 border-t"
      >
        <div className="flex h-full w-full items-center justify-between border-t-neutral-light-gray bg-neutral-white px-5 sm:mx-auto sm:max-w-5xl sm:px-0">
          <button className="outline-none">
            <BookmarkIcon size={24} className="text-neutral-rich-gray" />
          </button>
          <div className="flex items-center gap-4">
            <time className="text-neutral-medium-gray" dateTime="2022-01-01">
              Updated 2h ago
            </time>
            <Button className="w-[165px]">Apply</Button>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}
