import { ProjectType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { LuChevronRight } from 'react-icons/lu';
import MenuLink from '@/constants/MenuLink';

interface CalendarCardProp {
  project: ProjectType;
}

const CalendarCard: React.FC<CalendarCardProp> = ({ project }) => {
  return (
    <Link
      href={`${MenuLink.PROJECTS}/${project.alias}`}
      className="card-hover block w-full  rounded-[1rem] border border-neutral-light-gray bg-neutral-white p-[.75rem]"
    >
      <div className="">
        <div className="flex gap-[8px]">
          <div className="relative h-[2rem] w-[2rem]  overflow-hidden">
            {project.logo && <Image src={project.logo} alt={project.name} fill className="object-cover" />}
          </div>
          <div className="w-0 flex-1 overflow-hidden">
            <div className="headline-h5 flex flex-1 items-center justify-between">
              <h2 className="w-[80%] truncate">{project.name}</h2>
              <LuChevronRight size={20} />
            </div>
            <div className="h-14px caption-10pt flex w-full overflow-hidden text-neutral-rich-gray">
              {project.tracks?.map((v, i) => (
                <span
                  key={i}
                  className={`flex h-full  items-center border-l ${i ? 'border-neutral-light-gray px-[6px]' : 'border-transparent pr-[6px]'}`}
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div
          className="caption-10pt mt-[8px] line-clamp-3  whitespace-pre-line text-neutral-rich-gray"
          dangerouslySetInnerHTML={{ __html: project.detail?.detailedIntro || '' }}
        ></div>
      </div>
    </Link>
  );
};

export default CalendarCard;
