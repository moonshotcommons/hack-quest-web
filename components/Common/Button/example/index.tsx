import { FC, ReactNode } from 'react';
import Button from '..';
import ProgressIcon from '../../Icon/Progress';
import RightIcon from '../../Icon/Right';

interface ButtonExampleProps {
  // children: ReactNode;
}

const ButtonExample: FC<ButtonExampleProps> = (props) => {
  return (
    <div>
      <div>
        <h1 className="text-text-default-color text-[24px] pb-8 ">
          Base Button
        </h1>
        <div className="flex flex-row gap-8 items-center">
          <Button
            type="primary"
            className="bg-course-progress-button-bg text-course-progress-text-bg"
            size="small"
            icon={
              <i className="text-course-progress-icon-bg">
                <ProgressIcon />
              </i>
            }
          >
            45% COMPLETED
          </Button>
          <Button
            type="primary"
            className="bg-course-progress-button-bg text-course-progress-text-bg px-[2rem] py-[.75rem]"
            icon={<RightIcon />}
            iconPosition="right"
          >
            Login To Learn Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonExample;
