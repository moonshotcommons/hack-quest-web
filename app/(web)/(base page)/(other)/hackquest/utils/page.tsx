import { FC } from 'react';
import UrlDownload from './components/UrlDownload';

interface UtilsPageProps {}

const UtilsPage: FC<UtilsPageProps> = (props) => {
  return (
    <div className="container mx-auto flex flex-col gap-8 py-10">
      <UrlDownload />
    </div>
  );
};

export default UtilsPage;
