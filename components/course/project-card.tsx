import Button from '@/components/Common/Button';
import { Badge } from '@/components/ui/badge';
import { Progress, ProgressLabel } from '@/components/ui/progress';

export function ProjectCard() {
  return (
    <div className="flex flex-col rounded-2xl border border-neutral-light-gray bg-neutral-white">
      <div className="relative h-40 w-full"></div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Solana</Badge>
          <Badge>NFT</Badge>
        </div>
        <h1 className="text-base font-bold text-neutral-off-black">Project course title maximum is two lines</h1>
        <Progress value={10}>
          <ProgressLabel>10%</ProgressLabel>
        </Progress>
        <Button type="primary" className="w-full uppercase">
          continue
        </Button>
      </div>
    </div>
  );
}
