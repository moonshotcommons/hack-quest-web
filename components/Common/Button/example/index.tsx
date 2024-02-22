import { FC } from 'react';
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
        <h1 className="body-xl pb-8 text-text-default-color ">Base Button</h1>
        <div className="flex flex-row items-center gap-8">
          <Button
            type="primary"
            className="text-course-progress-text-bg bg-course-progress-button-bg"
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
            className="text-course-progress-text-bg bg-course-progress-button-bg px-[2rem] py-[.75rem]"
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
