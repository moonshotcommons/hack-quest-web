import { FC } from 'react';
import UrlDownload from './components/UrlDownload';
import GenerateChainId from './components/GenerateChainId';
import { TransformText } from './components/TranformText';

interface UtilsPageProps {}

const UtilsPage: FC<UtilsPageProps> = (props) => {
  return (
    <div className="container mx-auto flex flex-col gap-8 py-10">
      <UrlDownload />
      <GenerateChainId />
      <TransformText />
    </div>
  );
};

export default UtilsPage;
