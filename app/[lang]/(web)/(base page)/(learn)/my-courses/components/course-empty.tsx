import Button from '@/components/Common/Button';
import { EcosystemCard } from '@/components/ecosystem/ecosystem-card';

export function CourseEmpty() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col items-center gap-4 py-8">
        <h2 className="text-base font-bold text-neutral-black sm:text-lg">You’re not enrolled in any course</h2>
        <Button size="small" ghost>
          Explore courses
        </Button>
      </div>
      <div className="flex flex-col gap-5 sm:gap-8">
        <h2 className="text-lg font-bold text-neutral-black">Explore Certified Learning Track</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
          <EcosystemCard />
          <EcosystemCard />
        </div>
      </div>
    </div>
  );
}
