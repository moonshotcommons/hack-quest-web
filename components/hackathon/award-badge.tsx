import Image from 'next/image';

export function AwardBadge() {
  return (
    <div className="flex w-full items-center justify-center rounded-t-2xl bg-yellow-extra-light py-3 sm:w-fit sm:rounded-[0.5rem] sm:px-4 sm:py-2">
      <Image src="/images/ecosystem/silver_medal.svg" width={24} height={32} alt="award badge" />
      <h2 className="ml-2 inline-flex items-center text-sm text-neutral-off-black sm:text-lg">
        You won the <span className="mx-1.5 text-lg font-bold sm:text-2xl">1st</span>prize!
      </h2>
    </div>
  );
}
