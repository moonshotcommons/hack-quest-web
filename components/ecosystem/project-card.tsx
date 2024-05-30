import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Common/Button';
import { Badge } from '@/components/ui/badge';
import { Progress, ProgressLabel } from '@/components/ui/progress';
import { CourseDetailType } from '@/service/webApi/course/type';
import { getCoverImageByTrack } from '@/helper/utils';

export function ProjectCard({ course }: { course: CourseDetailType }) {
  return (
    <Link href={`/practices/${course.id}`}>
      <div className="card-hover flex flex-col rounded-2xl border border-neutral-light-gray bg-neutral-white">
        <div className="relative h-40 w-full">
          {course.image ? (
            <Image src={course.image} alt={course.title} fill className="rounded-t-2xl object-cover" />
          ) : (
            getCoverImageByTrack(course.track)
          )}
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{course.track}</Badge>
          </div>
          <h1 className="text-base font-bold text-neutral-off-black">{course.title}</h1>
          <Progress value={(course.progress || 0) * 100}>
            <ProgressLabel>{Math.floor((course.progress || 0) * 100)}%</ProgressLabel>
          </Progress>
          <Button ghost={course.progress === 1} type="primary" className="h-12 w-full uppercase">
            {course.progress === 1 ? 'Completed' : 'Continue'}
          </Button>
        </div>
      </div>
    </Link>
  );
}
