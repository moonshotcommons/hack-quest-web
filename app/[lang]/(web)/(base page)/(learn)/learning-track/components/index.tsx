import webApi from '@/service';
import { bannerTabList } from '../constants/data';
import { LanguageTab, SearchInfoType } from '../constants/type';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import RenderPage from './RenderPage';
import { Lang } from '@/i18n/config';

interface LearningTrackProps {
  searchParams: SearchInfoType;
  params: {
    lang: Lang;
  };
}
const LearningTrack: React.FC<LearningTrackProps> = async ({ searchParams, params: { lang } }) => {
  const searchInfo = {
    track: searchParams.track || bannerTabList[0].value,
    language: searchParams.language || LanguageTab.ALL
  };
  const learningTrackListData = await webApi.learningTrackApi.getLearningTracks(searchInfo);
  return (
    <div className="">
      <RenderPage learningTrackListData={learningTrackListData} searchInfo={searchInfo} lang={lang} />
      <PageRetentionTime trackName="home-learning-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default LearningTrack;
