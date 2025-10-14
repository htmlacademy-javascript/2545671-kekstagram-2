export const STEP_SCALE = 25;
export const MIN_VALUE_SCALE = 25;
export const MAX_VALUE_SCALE = 100;
export const DEFAULT_SCALE = 100;

export const EFFECTS = [
  {
    name: 'none',
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
];

export const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

export const PICTURES_COUNT = 10;

export const SORT_FUNCTION = {
  getRandom: () => Math.random() - 0.5,
  discussed: (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length
};
