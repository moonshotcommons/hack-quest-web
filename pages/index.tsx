import ConceptLearningCard from '@/components/Card/ConceptLearning';
import HackathonCard from '@/components/Card/Hackathon';
import LearningTracksCard from '@/components/Card/LearningTracks';
import SyntaxCard from '@/components/Card/Syntax';

import Title from '@/components/Common/Title';
import { CardType } from '@/constants/enum';

import { SliderContainer } from '@/components/Common/SliderContainer';
import { NextPage } from 'next';

interface CourseType {
  type: CardType;
  title: string;
  tags?: string[];
  description?: string;
  duration?: number;
  unitCount?: number;
  progress?: number;
  cover?: string;
}

interface CoursesProps {
  // nowCards: CourseType[];
  // syntaxCards: CourseType[];
  // tracksCards: CourseType[];
}

const Landing: NextPage<CoursesProps> = (props) => {
  // const { nowCards, syntaxCards, tracksCards } = props;

  return <>Landing</>;
};

Landing.displayName = 'Courses';

Landing.getInitialProps = (context) => {
  return {};
};

export default Landing;
