import { MotionProps } from 'framer-motion';

export const projectSort = [
  {
    label: 'Featured',
    value: '-featured'
  },
  {
    label: 'Latest to oldest',
    value: '-startTime'
  },
  {
    label: 'Oldest to latest',
    value: 'startTime'
  }
];

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
