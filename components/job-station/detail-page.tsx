'use client';

import { motion } from 'framer-motion';
import { Back } from './components/back';

export default function Page() {
  return (
    <main className="flex h-full w-full flex-col bg-neutral-white pt-12">
      <div className="container mx-auto flex-1 space-y-6">
        <Back />
      </div>
      <motion.footer
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'tween', ease: 'easeOut' }}
        className="flex h-[72px] w-full shrink-0 border-t"
      >
        <div className="container mx-auto flex h-full items-center justify-between border-t-neutral-light-gray">
          111
        </div>
      </motion.footer>
    </main>
  );
}
