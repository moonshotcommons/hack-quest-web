import { MotionProps } from 'framer-motion';

import { FilterItemType, FilterOptionType, FilterParamsType } from './type';
import { CourseLanguageType } from '@/service/webApi/course/type';
import { LanguageTab } from '@/app/mobile/(learn)/learning-track/constants/type';

export const animateProps: MotionProps = {
  initial: { scaleY: 0, opacity: 0, translateY: '95%' },
  animate: {
    opacity: 1,
    scaleY: 1,
    translateY: '100%',
    position: 'absolute'
  },
  exit: {
    opacity: 1,
    scaleY: 1,
    translateY: '100%',
    position: 'absolute'
  },
  transition: { duration: 0.5, type: 'spring' },
  style: { originY: 0 }
};

export const learningTrackFilters = [
  {
    filterName: 'Language',
    filterField: 'language',
    options: [
      { name: 'All', value: LanguageTab.ALL, isSelect: true },
      { name: 'Solidity', value: CourseLanguageType.SOLIDITY, isSelect: false },
      { name: 'Rust', value: CourseLanguageType.RUST, isSelect: false },
      { name: 'Move ', value: CourseLanguageType.MOVE, isSelect: false }
    ]
  }
];

export const courseDefaultFilters = [
  {
    filterName: 'Language',
    filterField: 'language',
    options: [
      { name: 'Solidity', value: 'SOLIDITY', isSelect: false },
      { name: 'Rust', value: 'RUST', isSelect: false },
      { name: 'Move ', value: 'MOVE', isSelect: false }
    ]
  },
  {
    filterName: 'Track',
    filterField: 'track',
    options: [
      { name: 'DeFi', value: 'DeFi', isSelect: false },
      { name: 'NFT', value: 'NFT', isSelect: false },
      { name: 'Security', value: 'Security', isSelect: false },
      { name: 'Gaming', value: 'Gaming', isSelect: false }
    ]
  },
  {
    filterName: 'Difficulty',
    filterField: 'level',
    options: [
      { name: 'Beginner', value: 'BEGINNER', isSelect: false },
      { name: 'Intermediate', value: 'INTERMEDIATE', isSelect: false },
      { name: 'Advanced', value: 'ADVANCED', isSelect: false }
    ]
  }
];

export const courseDefaultSort = [
  { name: 'Most Popular', value: '-peopleJoined', isSelect: false },
  { name: 'Newest', value: '-createdAt', isSelect: true }
];

export const mergeFilterParams = (
  filters: FilterItemType[],
  sort: FilterOptionType[],
  keyword?: string
): FilterParamsType => {
  const sortValue = sort.find((item) => item.isSelect)?.value;
  const filtersObject: Record<string, string> = {};
  filters.forEach((f) => {
    const key = f.filterField;
    const values = f.options
      .filter((option) => option.isSelect)
      .map((o) => o.value);
    if (values.length) filtersObject[key] = values.join(',');
  });
  return {
    ...filtersObject,
    sort: (sortValue as string) || '',
    keyword: keyword || ''
  };
};
