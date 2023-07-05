import LeftArrowIcon from '@/components/Common/Icon/LeftArrow';
import { FC, ReactNode } from 'react';

interface GuidePageProps {
  // children: ReactNode;
}

const GuidePage: FC<GuidePageProps> = (props) => {
  return (
    <div>
      <div>
        <div>
          <LeftArrowIcon></LeftArrowIcon>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default GuidePage;
