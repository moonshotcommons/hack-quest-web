'use client';

import { motion } from 'framer-motion';
import { FavoriteButton } from './favorite-button';
import moment from 'moment';
import ApplyJob from './apply-job';

export function Footer({
  favorited,
  id,
  createdAt,
  contact
}: {
  favorited: boolean;
  id: string;
  createdAt: string;
  contact: Record<string, string>;
}) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'tween', ease: 'easeOut' }}
      className="flex h-[72px] w-full shrink-0 border-t"
    >
      <div className="flex h-full w-full items-center justify-between border-t-neutral-light-gray bg-neutral-white px-5 sm:mx-auto sm:max-w-5xl sm:px-0">
        <FavoriteButton favorited={favorited} jobId={id} />
        <div className="flex items-center gap-4">
          <time className="text-sm text-neutral-medium-gray sm:text-base" dateTime={createdAt}>
            {moment(createdAt).fromNow()}
          </time>
          <ApplyJob contact={contact} />
        </div>
      </div>
    </motion.footer>
  );
}
