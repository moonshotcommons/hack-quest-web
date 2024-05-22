import Link from 'next/link';

export default function HackathonEmpty({ text, label, href }: { text: string; label: string; href: string }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 py-20">
      <p className="text-base text-neutral-black sm:text-lg">{text}</p>
      <Link href={href}>
        <span className="rounded-full border border-neutral-black px-6 py-2 text-sm font-medium uppercase text-neutral-black">
          {label}
        </span>
      </Link>
    </div>
  );
}
