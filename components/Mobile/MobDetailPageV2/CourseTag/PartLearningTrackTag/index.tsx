import { FC, ReactNode } from 'react';

interface PartLearningTrackTagProps {
  icon?: ReactNode;
  label?: ReactNode;
  value?: string;
  valueHandler?: () => void;
  valueRender?: () => ReactNode;
}

const PartLearningTrackTag: FC<PartLearningTrackTagProps> = (props) => {
  return <div>PartLearningTrackTag</div>;
};

export default PartLearningTrackTag;
