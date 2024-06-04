import { HACKQUEST_DISCORD, HACKQUEST_TELEGRAM, HACKQUEST_TWITTER } from '@/constants/links';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { itemVariants } from '../constant';

const SOCIAL_LINKS = [
  {
    name: 'Twitter',
    url: HACKQUEST_TWITTER
  },
  {
    name: 'Discord',
    url: HACKQUEST_DISCORD
  },
  {
    name: 'Telegram',
    url: HACKQUEST_TELEGRAM
  }
];

export function SocialLink() {
  return (
    <motion.div
      variants={itemVariants}
      className="fixed inset-x-0 bottom-0 z-10 flex items-center justify-center gap-10 bg-neutral-white py-6"
    >
      {SOCIAL_LINKS.map((link) => (
        <Link key={link.name} href={link.url} target="_blank" rel="noreferrer">
          <Image
            src={`/images/social/${link.name.toLocaleLowerCase()}.svg`}
            width={32}
            height={32}
            alt={link.name}
            priority
          />
        </Link>
      ))}
    </motion.div>
  );
}
