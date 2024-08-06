import React, { useMemo } from 'react';
import WinnerProject from '../WinnerProject';
import { HackathonJudgeProjectType } from '@/service/webApi/resourceStation/type';

interface ProjectsModalProp {
  handleSelect: (item: HackathonJudgeProjectType) => void;
  projectName: string;
  projects: HackathonJudgeProjectType[];
}

const ProjectsModal: React.FC<ProjectsModalProp> = ({ handleSelect, projectName, projects }) => {
  const winnerList = useMemo(() => {
    return projects.filter((v) => v.name?.toLocaleLowerCase().includes(projectName?.toLocaleLowerCase()));
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
