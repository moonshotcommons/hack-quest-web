import { Button } from '@/components/ui/button';
import { GithubIcon } from '@/components/ui/icons/github';

export function DeveloperProfile() {
  return (
    <div className="rounded-2xl border border-neutral-light-gray p-6">
      <h2 className="font-next-book-bold text-[22px] font-bold text-neutral-off-black">Developer Profile</h2>
      <Button className="mt-6 inline-flex w-[140px] gap-3" variant="outline" size="small">
        <GithubIcon className="h-5 w-5" />
        <span>connect</span>
      </Button>
    </div>
  );
}
