import Basic from '@/public/images/home/learning_banner_basic.png.png';
import BasicActive from '@/public/images/home/learning_banner_basic_active.png';
import Specialization from '@/public/images/home/learning_track_specialization.png';
import SpecializationActive from '@/public/images/home/learning_track_specialization_active.png';
import { LanguageTab, LearningTrackTab } from './type';
import { CourseLanguageType } from '@/service/webApi/course/type';

export const bannerTabList = [
  {
    label: 'learningTrack.basic',
    value: LearningTrackTab.BASIC,
    description: 'learningTrack.basicTabDesc',
    img: Basic,
    imgActive: BasicActive
  },
  {
    label: 'learningTrack.specialization',
    value: LearningTrackTab.SPECIALLIZATION,
    description: 'learningTrack.specializationTabDesc',
    img: Specialization,
    imgActive: SpecializationActive
  }
];

export const filterList = [
  {
    label: 'learningTrack.allLanguage',
    value: LanguageTab.ALL
  },
  {
    label: 'Solidity',
    value: CourseLanguageType.SOLIDITY
  },
  {
    label: 'Rust',
    value: CourseLanguageType.RUST
  }
  // {
  //   label: 'Move',
  //   value: CourseLanguageType.MOVE
  // }
];
