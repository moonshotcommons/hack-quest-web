import Image from 'next/image';
import Link from 'next/link';
import { getHackathonDetailById } from '@/service/cach/resource/hackathon';
import { Button } from '@/components/ui/button';
import { JudgeTab } from '../../components/Hackathon/JudgeTab';

export default async function Page({ params }: { params: { alias: string } }) {
  const hackathon = await getHackathonDetailById(params.alias);

  return (
    <div className="p-5">
      <nav role="navigation" aria-label="breadcrumb">
        <ol className="body-s flex items-center gap-2 text-neutral-off-black">
          <li className="whitespace-nowrap">
            <Link href="/hackathon/projects">Project Archive</Link>
          </li>
          <li>/</li>
          <li className="truncate underline">{hackathon.name}</li>
        </ol>
      </nav>
      <section className="mt-5 flex w-full flex-col gap-4">
        <div className="relative h-[197px] w-full">
          <Image src={hackathon.info?.image} alt={hackathon.name} fill className="rounded-2xl" />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h1 className="font-next-book-bold text-lg font-bold">{hackathon.name}</h1>
            {hackathon.info?.intro && <p className="body-s mt-2 text-neutral-rich-gray">{hackathon.info?.intro}</p>}
          </div>
          <Button asChild className="mt-4 w-full" variant="outline">
            <Link href={`/hackathon/explore/${hackathon.alias}`}>view hackathon details</Link>
          </Button>
        </div>
      </section>
      <JudgeTab judges={hackathon.judge} />
    </div>
  );
}
