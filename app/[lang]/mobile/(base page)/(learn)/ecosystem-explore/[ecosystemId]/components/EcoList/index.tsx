import React from 'react';
import { EcosystemTask } from '@/service/webApi/ecosystem/type';
import DeveloperCard from '../../../components/DeveloperCard';
import Title from '../Title';

interface EcoListProp {
  list: EcosystemTask[];
}

const EcoList: React.FC<EcoListProp> = ({ list }) => {
  if (!list.length) return null;
  return (
    <div className="flex flex-col gap-[2.5rem]">
      {list.map((task) => (
        <div className="flex w-full flex-col gap-[1.25rem] " key={task.taskId}>
          <Title title={task.name} description={task.description} />
          {task.courses.map((course) => (
            <DeveloperCard key={course.id} course={course} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default EcoList;
