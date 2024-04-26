import { MotionProps } from 'framer-motion';

export const animateProps: MotionProps = {
  initial: { scaleY: 0, opacity: 0, translateY: '-5%' },
  animate: {
    opacity: 1,
    scaleY: 1,
    translateY: '0',
    position: 'absolute'
  },
  exit: {
    opacity: 1,
    scaleY: 1,
    translateY: '0',
    position: 'absolute'
  },
  transition: { duration: 0.5, type: 'spring' },
  style: { originY: 0 }
};
