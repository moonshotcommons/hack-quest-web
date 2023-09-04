import { NextPage } from 'next';
import HomeBanner from '@/components/v2/Landing/HomeBanner';
import HomeCourseTab from '@/components/Home/HomeCoursesTab';
import HackQuestInfo from '@/components/Home/HackQuestInfo';
import JoinUs from '@/components/Home/JoinUs';
const Landing: NextPage<any> = (props) => {
  // const { nowCards, syntaxCards, tracksCards } = props;

  return (
    <div className="flex  flex-col justify-center">
      <HomeBanner></HomeBanner>
      <HomeCourseTab></HomeCourseTab>
      <HackQuestInfo></HackQuestInfo>
      <div className="mt-[6.25rem]">
        <JoinUs></JoinUs>
      </div>
    </div>
  );
};

Landing.displayName = 'Courses';

// Landing.getInitialProps = (context) => {
//   return {};
// };

export default Landing;
