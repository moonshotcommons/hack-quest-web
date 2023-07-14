import LearningTracksCard from '@/components/Card/LearningTracks';
import Link from 'next/link';
import { getCourseLink } from './utils';
import { CourseResponse, CourseType } from '@/service/webApi/course/type';
import SyntaxCard from '@/components/Card/Syntax';
import HackathonCard from '@/components/Card/Hackathon';
import TeaserCard from '@/components/Card/Teaser';
import GuidedProjectCard from '@/components/Card/GuidedProject';
import ConceptLearningCard from '@/components/Card/ConceptLearning';
import { LearningTrackType } from '@/service/webApi/learningTrack/type';

export const renderCourseCard = (card: CourseResponse) => {
  switch (card.type) {
    case CourseType.CONCEPT:
      return (
        <Link href={`${getCourseLink(CourseType.CONCEPT)}/${card.id}`}>
          <ConceptLearningCard
            title={card.name}
            tags={card.level || []}
            description={card.description || ''}
            duration={card.duration || 0}
            unitCount={card.unitCount || 0}
            progress={card.progress || 0}
            cover={'/images/card/ConceptLearning/cover.svg'}
          ></ConceptLearningCard>
        </Link>
      );
    case CourseType.HACKATHON:
      return (
        <Link href={`${getCourseLink(CourseType.HACKATHON)}/${card.id}`}>
          <HackathonCard
            name={card.name}
            tags={card.level || []}
          ></HackathonCard>
        </Link>
      );
    case CourseType.LEARNING_TRACK:
      return (
        <Link href={`${getCourseLink(CourseType.LEARNING_TRACK)}/${card.id}`}>
          <LearningTracksCard
            name={card.name}
            tags={card.level || []}
            description={card.description || ''}
            duration={card.duration || 0}
            courseCount={card.unitCount || 0}
            progress={0}
          ></LearningTracksCard>
        </Link>
      );
    case CourseType.SYNTAX:
      return (
        <Link href={`${getCourseLink(CourseType.SYNTAX)}/${card.id}`}>
          <SyntaxCard
            name={card.name}
            tags={card.level || []}
            description={card.description || ''}
            duration={card.duration || 0}
            unitCount={card.unitCount || 0}
            progress={card.progress || 0}
          ></SyntaxCard>
        </Link>
      );
    case CourseType.TEASER:
      return (
        <Link href={`${getCourseLink(CourseType.TEASER)}/${card.id}`}>
          <TeaserCard
            name={card.name}
            description={card.description || ''}
            duration={card.duration || 0}
            unitCount={card.unitCount || 0}
            progress={card.progress || 0}
          ></TeaserCard>
        </Link>
      );
    case CourseType.GUIDED_PROJECT:
      return (
        <Link href={`${getCourseLink(CourseType.GUIDED_PROJECT)}/${card.id}`}>
          <GuidedProjectCard
            name={card.name}
            tags={card.level || []}
            description={card.description || ''}
            duration={card.duration || 0}
            unitCount={card.unitCount || 0}
            progress={card.progress || 0}
          ></GuidedProjectCard>
        </Link>
      );
  }
};

export const renderLearningTrackCard = (learningTrack: LearningTrackType) => {
  return (
    <Link
      href={`${getCourseLink(CourseType.LEARNING_TRACK)}/${learningTrack.id}`}
    >
      <LearningTracksCard
        name={learningTrack.name}
        tags={learningTrack.level || []}
        description={learningTrack.description || ''}
        duration={learningTrack.duration || 0}
        courseCount={learningTrack.courseCount || 0}
        progress={0}
      ></LearningTracksCard>
    </Link>
  );
};
