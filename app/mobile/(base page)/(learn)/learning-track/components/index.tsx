import webApi from '@/service';
import { bannerTabList } from '../constants/data';
import { LanguageTab, SearchInfoType } from '../constants/type';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import RenderPage from './RenderPage';
interface LearningTrackProps {
  searchParams: SearchInfoType;
}
const LearningTrack: React.FC<LearningTrackProps> = async ({
  searchParams
}) => {
  const searchInfo = {
    track: searchParams.track || bannerTabList[0].value,
    language: searchParams.language || LanguageTab.ALL
  };
  const learningTrackListData =
    await webApi.learningTrackApi.getLearningTracks(searchInfo);

  return (
    <div className="">
      <RenderPage
        learningTrackListData={learningTrackListData}
        searchInfo={searchInfo}
      />
      <PageRetentionTime trackName="home-learning-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default LearningTrack;
