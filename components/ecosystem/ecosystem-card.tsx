import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

function convertString(input?: string) {
  const lowerCaseString = input?.toLowerCase();
  const result = lowerCaseString?.replace(' developer', '');
  return result;
}

export function EcosystemCard({
  name,
  title,
  description,
  href,
  tags
}: {
  name: string;
  title: string;
  description: string;
  href: string;
  tags: string[];
}) {
  return (
    <Link href={href}>
      <div className="flex w-full items-center justify-between gap-4 rounded-2xl bg-neutral-white p-4">
        <div className="flex flex-col gap-3">
          <h2 className="font-bold capitalize text-neutral-black">{title}</h2>
          <p className="line-clamp-2 text-xs text-neutral-medium-gray">{description}</p>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}
          </div>
        </div>
        <div className="relative h-12 w-12 flex-shrink-0">
          <Image src={`/images/ecosystem/${convertString(name)}-logo.svg`} alt={name} fill />
        </div>
      </div>
    </Link>
  );
}
