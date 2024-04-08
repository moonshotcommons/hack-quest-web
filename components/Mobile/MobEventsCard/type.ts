import { MotionProps } from 'framer-motion';

export const animateProps: MotionProps = {
  initial: { scaleY: 0, opacity: 0 },
  animate: {
    opacity: 1,
    scaleY: 1
  },
  exit: {
    opacity: 1,
    scaleY: 1
  },
  transition: { duration: 0.5, type: 'spring' },
  style: { originY: 0 }
};
