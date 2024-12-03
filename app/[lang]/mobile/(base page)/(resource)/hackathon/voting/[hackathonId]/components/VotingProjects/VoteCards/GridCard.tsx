import TrackTag from '@/components/Common/TrackTag';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import Image from 'next/image';
import React from 'react';
import { LuChevronRight } from 'react-icons/lu';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { ViewValue } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import HandleVote from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/voting/[hackathonId]/components/HandleVote';

interface GridCardProp {
  project: ProjectType;
}

const GridCard: React.FC<GridCardProp> = ({ project }) => {
  return (
    <div className=" w-full  rounded-[16px] border border-neutral-light-gray bg-neutral-white p-[16px]">
      <div className="mb-[8px]">
        <div className="flex gap-[8px]">
          <div className="relative h-[48px] w-[48px]  overflow-hidden">
            {project.logo && <Image src={project.logo} alt={project.name} fill className="object-cover" />}
          </div>
          <div className="flex-1">
            <Link
              href={`${MenuLink.PROJECTS}/${project.alias}`}
              className="text-h5 flex flex-1 items-center justify-between"
            >
              <h2 className="w-[80%] truncate">{project.name}</h2>
              <LuChevronRight size={20} />
            </Link>
            <div className="flex w-full gap-[12px] overflow-hidden">
              {project.tracks?.map((v, i) => <TrackTag track={v} key={i} />)}
            </div>
          </div>
        </div>
        <div
          className="caption-10pt mt-[8px] line-clamp-4 h-[60px] whitespace-pre-line text-neutral-rich-gray "
          dangerouslySetInnerHTML={{ __html: project.detail?.detailedIntro || '' }}
        ></div>
      </div>
      <div className="h-[63px] w-full rounded-[8px] bg-neutral-off-white px-[12px] py-[8px]">
        <HandleVote view={ViewValue.GRID} project={project} />
      </div>
    </div>
  );
};

export default GridCard;
