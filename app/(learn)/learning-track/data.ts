import Basic from '@/public/images/home/learning_banner_basic.png.png';
import BasicActive from '@/public/images/home/learning_banner_basic_active.png';
import Specialization from '@/public/images/home/learning_track_specialization.png';
import SpecializationActive from '@/public/images/home/learning_track_specialization_active.png';
import { LearningTrackTab, LearningTrackFilter } from './type';

export const bannerTabList = [
  {
    label: 'Basic',
    value: LearningTrackTab.BASIC,
    description:
      'Master one Web3 coding language and learn how to deploy On Chain!',
    img: Basic,
    imgActive: BasicActive
  },
  {
    label: 'Specialization',
    value: LearningTrackTab.SPECIALLIZATION,
    description: 'Focus on one specific area and become an expert!',
    img: Specialization,
    imgActive: SpecializationActive
  }
];

export const filterList = [
  {
    label: 'All',
    value: LearningTrackFilter.ALL
  },
  {
    label: 'Solidity',
    value: LearningTrackFilter.SOLIDITY
  },
  {
    label: 'Rust',
    value: LearningTrackFilter.RUST
  },
  {
    label: 'Move',
    value: LearningTrackFilter.MOVE
  }
];
