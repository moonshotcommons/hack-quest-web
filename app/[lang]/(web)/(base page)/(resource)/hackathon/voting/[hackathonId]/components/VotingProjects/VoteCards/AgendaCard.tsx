import TrackTag from '@/components/Common/TrackTag';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import Image from 'next/image';
import React from 'react';
import { LuChevronRight } from 'react-icons/lu';
import HandleVote from '../../HandleVote';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { ViewValue } from '../../../../../constants/type';

interface AgendaCardProp {
  project: ProjectType;
}

const AgendaCard: React.FC<AgendaCardProp> = ({ project }) => {
  return (
    <div className="flex h-[196px] gap-[24px] rounded-[16px] border border-neutral-light-gray bg-neutral-white p-[24px]">
      <div className="relative h-[148px] w-[148px] flex-shrink-0 overflow-hidden rounded-[8px]">
        {project.logo && <Image src={project.logo} alt={project.name} fill className="object-cover" />}
      </div>
      <div className="flex h-full flex-1 flex-col justify-between overflow-hidden border-r border-neutral-light-gray pr-[24px]">
        <div>
          <Link
            href={`${MenuLink.PROJECTS}/${project.alias}`}
            className="text-h3 flex w-full items-center justify-between "
          >
            <h2 className="w-[80%] truncate text-neutral-off-black">{project.name}</h2>
            <LuChevronRight size={40} className="text-neutral-off-black" />
          </Link>
          <div className="flex max-h-[29px] w-full flex-wrap gap-[12px] overflow-hidden">
            {project.tracks?.map((v, i) => <TrackTag track={v} key={i} />)}
          </div>
        </div>
        <p
          className="body-xs line-clamp-3 whitespace-pre-line text-neutral-rich-gray"
          dangerouslySetInnerHTML={{ __html: project.detail?.detailedIntro || '' }}
        ></p>
      </div>
      <div className="h-full w-[209px]">
        <HandleVote view={ViewValue.AGENDA} project={project} />
      </div>
    </div>
  );
};

export default AgendaCard;
