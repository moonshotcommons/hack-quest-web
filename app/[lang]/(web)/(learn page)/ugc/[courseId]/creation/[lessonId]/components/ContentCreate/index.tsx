import { FC } from 'react';
import { HackquestEditor } from '@moonshotcommons/hackquest-editor';
import { initialContent } from './constants';
interface ContentCreateProps {}

const ContentCreate: FC<ContentCreateProps> = (props) => {
  return (
    <div className="h-full w-full">
      <HackquestEditor content={initialContent} />
    </div>
  );
};

export default ContentCreate;
