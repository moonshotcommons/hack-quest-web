import { MotionProps } from 'framer-motion';

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

const filterData = {
  filter: [
    {
      filterName: 'Language',
      filterField: 'language',
      options: [
        { name: 'Solidity', value: 'Solidity', isSelect: false },
        { name: 'Rust', value: 'Rust', isSelect: false },
        { name: 'Move ', value: 'Move ', isSelect: false }
      ]
    },
    {
      filterName: 'Track',
      filterField: 'track',
      options: [
        { name: 'DeFi', value: 'DeFi', isSelect: false },
        { name: 'NFT', value: 'NFT', isSelect: false },
        { name: 'Data', value: 'Data', isSelect: false }
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
  ],
  sort: [
    { name: 'Most Popular', value: 'Most Popular', isSelect: false },
    { name: 'Newest', value: 'Newest', isSelect: true }
  ]
};
