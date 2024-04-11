import { MotionProps } from 'framer-motion';

import { FilterItemType, FilterOptionType, FilterParamsType } from './type';
import { CourseLanguageType } from '@/service/webApi/course/type';
import { LanguageTab } from '@/app/[lang]/mobile/(base page)/(learn)/learning-track/constants/type';

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
    filterName: 'courses.language',
    filterField: 'language',
    options: [
      { name: 'learningTrack.allLanguage', value: LanguageTab.ALL, isSelect: true },
      { name: 'Solidity', value: CourseLanguageType.SOLIDITY, isSelect: false },
      { name: 'Rust', value: CourseLanguageType.RUST, isSelect: false }
      // { name: 'Move ', value: CourseLanguageType.MOVE, isSelect: false }
    ]
  }
];

export const courseDefaultFilters = [
  {
    filterName: 'courses.language',
    filterField: 'language',
    options: [
      { name: 'Solidity', value: 'SOLIDITY', isSelect: false },
      { name: 'Rust', value: 'RUST', isSelect: false }
      // { name: 'Move', value: 'MOVE', isSelect: false }
    ]
  },
  {
    filterName: 'courses.track',
    filterField: 'track',
    options: [
      { name: 'DeFi', value: 'DeFi', isSelect: false },
      { name: 'NFT', value: 'NFT', isSelect: false },
      { name: 'Security', value: 'Security', isSelect: false },
      { name: 'Gaming', value: 'Gaming', isSelect: false }
    ]
  },
  {
    filterName: 'courses.difficulty',
    filterField: 'level',
    options: [
      { name: 'courses.beginner', value: 'BEGINNER', isSelect: false },
      { name: 'courses.intermediate', value: 'INTERMEDIATE', isSelect: false },
      { name: 'courses.advanced', value: 'ADVANCED', isSelect: false }
    ]
  }
];

export const ugcCourseDefaultFilters = courseDefaultFilters.filter((v) => v.filterField !== 'language');

export const courseDefaultSort = [
  { name: 'courses.mostPopular', value: '-peopleJoined', isSelect: false },
  { name: 'courses.newest', value: '-createdAt', isSelect: true }
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
    const values = f.options.filter((option) => option.isSelect).map((o) => o.value);
    if (values.length) filtersObject[key] = values.join(',');
  });
  return {
    ...filtersObject,
    sort: (sortValue as string) || '',
    keyword: keyword || ''
  };
};
