export const fadeInSoonerConfig = {
  from: { opacity: 0 },
  to: { opacity: 1 },
  delay: 100,
};

export const fadeInLaterConfig = {
  from: { opacity: 0 },
  to: { opacity: 1 },
  delay: 500,
};

export const fadeInLastConfig = {
  from: { opacity: 0 },
  to: { opacity: 1 },
  delay: 1250,
};

export const fadeInTopConfig = {
  from: { opacity: 0, y: -100 },
  to: { opacity: 1, y: 0 },
  delay: 1250,
};

export const staggerConfig = {
  from: { x: 300, opacity: 0 },
  enter: { x: 0, opacity: 1 },
  trail: 200,
  delay: 500,
};

export const fadeInAndOutConfig = {
  from: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
  leave: {
    opacity: 0,
  },
  exitBeforeEnter: true,
};
