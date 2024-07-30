import React, { useMemo } from 'react';
import WinnerProject from '../WinnerProject';

interface ProjectsModalProp {
  handleSelect: (item: any) => void;
  projectName: string;
}

const ProjectsModal: React.FC<ProjectsModalProp> = ({ handleSelect, projectName }) => {
  const winners = [
    {
      prizeName: 'fisrt1',
      id: 1,
      image: '/images/learn/hack_logo.png',
      name: 'MetaLine-XMetaLine-XMetaLine-XMetaLine-XMetaLine-XMetaLine-XMetaLine-XMetaLine-XMetaLine-XMetaLine-XMetaLine-XMetaLine-XMetaLine-XMetaLine-XMetaLine-XMetaLine-XMetaLine-XMetaLine-XMetaLine-XMetaLine-X',
      team: 'Scroll',
      rank: 1,
      totalVotes: 100
    },
    {
      prizeName: 'fisrt2',
      id: 2,
      image: '/images/learn/hack_logo.png',
      name: 'MetaLine-X',
      team: 'Scroll',
      rank: 2,
      totalVotes: 100
    },
    {
      prizeName: 'fisrt3',
      id: 3,
      image: '/images/learn/hack_logo.png',
      name: 'MetaLine-X',
      team: 'Scroll',
      rank: 3,
      totalVotes: 100
    },
    {
      prizeName: 'fisrt4',
      id: 4,
      image: '/images/learn/hack_logo.png',
      name: 'MetaLine-X',
      team: 'Scroll',
      rank: 4,
      totalVotes: 100
    },
    {
      prizeName: 'fisrt5',
      id: 5,
      image: '/images/learn/hack_logo.png',
      name: 'MetaLine-X',
      team: 'Scroll',
      rank: 5,
      totalVotes: 100
    },
    {
      prizeName: 'fisrt6',
      id: 6,
      image: '/images/learn/hack_logo.png',
      name: 'MetaLine-X',
      team: 'Scroll',
      rank: 6,
      totalVotes: 100
    }
  ];

  const winnerList = useMemo(() => {
    return winners.filter((v) => v.name?.toLocaleLowerCase().includes(projectName?.toLocaleLowerCase()));
  }, [projectName]);
  return (
    <div className="scroll-wrap-y max-h-[200px] w-full rounded-[8px] border border-neutral-medium-gray bg-neutral-white py-[10px]">
      {winnerList.length > 0 ? (
        winnerList.map((v) => (
          <div
            className="cursor-pointer px-[20px] py-[10px] hover:bg-yellow-extra-light "
            key={v.id}
            onClick={() => handleSelect(v)}
          >
            <WinnerProject project={v} />
          </div>
        ))
      ) : (
        <div className="py-[20px] text-center">There is no projects by this name</div>
      )}
    </div>
  );
};

export default ProjectsModal;
