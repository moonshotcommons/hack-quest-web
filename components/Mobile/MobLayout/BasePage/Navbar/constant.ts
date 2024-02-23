export const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 64px 64px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: 'circle(30px at -32px -32px)'
    // transition: {
    //   delay: 0.5,
    //   type: 'spring',
    //   stiffness: 400,
    //   damping: 40
    // }
  }
};

export const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

export const isBadgeIds = ['missions'];

export const MOBILE_NAVBAR_HEIGHT = 64;
