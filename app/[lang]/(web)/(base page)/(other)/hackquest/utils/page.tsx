import { FC } from 'react';
import UrlDownload from './components/UrlDownload';
import GenerateChainId from './components/GenerateChainId';

interface UtilsPageProps {}

const UtilsPage: FC<UtilsPageProps> = (props) => {
  return (
    <div className="container mx-auto flex flex-col gap-8 py-10">
      <UrlDownload />
      <GenerateChainId />
    </div>
  );
};

export default UtilsPage;
