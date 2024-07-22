import Image from 'next/image';

export function MobileModalHeader() {
  return (
    <div className="relative flex h-16 w-full shrink-0 items-center justify-center sm:hidden">
      <Image src="/images/logo/black-icon-text-logo.svg" width={184} height={22} alt="hackquest" />
    </div>
  );
}
