import { FC, ReactNode } from 'react';
import CreateByTag from './CreateByTag';
import LanguageTag from './LanguageTag';
import DurationTag from './DurationTag';
import LevelTag from './LevelTag';
import PartLearningTrackTag from './PartLearningTrackTag';
import { Lang } from '@/i18n/config';

export enum CourseTagType {
  CREATE_BY = 'create_by',
  DURATION = 'duration',
  LANGUAGE = 'language',
  LEVEL = 'level',
  PART_LEARNING_TRACK = 'part_learning_track'
}

interface CourseTagProps {
  type: CourseTagType;
  icon?: ReactNode;
  label?: ReactNode;
  value?: string;
  valueNode?: ReactNode;
  lang: Lang;
}

const CourseTag: FC<CourseTagProps> = (props) => {
  const { type, ...rest } = props;
  switch (type) {
    case CourseTagType.CREATE_BY:
      return <CreateByTag {...rest} />;
    case CourseTagType.LANGUAGE:
      return <LanguageTag {...rest} />;
    case CourseTagType.DURATION:
      return <DurationTag {...rest} />;
    case CourseTagType.LEVEL:
      return <LevelTag {...rest} />;
    case CourseTagType.PART_LEARNING_TRACK:
      return <PartLearningTrackTag {...rest} />;
    default:
      return null;
  }
};

export default CourseTag;
