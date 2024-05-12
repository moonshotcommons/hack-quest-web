import { HTMLMotionProps } from 'framer-motion';

export const ani: HTMLMotionProps<'div'> = {
  initial: {
    translateX: '100%',
    opacity: 0
  },
  animate: {
    opacity: 1,
    translateX: 0
  },
  exit: {
    opacity: 0,
    translateX: '100%'
  },
  transition: { duration: 0.3, type: 'tween', ease: 'easeOut' }
  // style: { originY: 0 }
};
