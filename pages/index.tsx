import { NextPage } from 'next';
import HomeBanner from '@/components/v2/Landing/HomeBanner';
import HackQuestInfo from '@/components/v2/Landing/HackQuestInfo';
import JoinUs from '@/components/Home/JoinUs';
const Landing: NextPage<any> = (props) => {
  // const { nowCards, syntaxCards, tracksCards } = props;

  return (
    <div className="flex  flex-col justify-center">
      <HomeBanner></HomeBanner>
      <HackQuestInfo></HackQuestInfo>
      <div className="mx-auto container py-[150px] flex justify-center">
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
