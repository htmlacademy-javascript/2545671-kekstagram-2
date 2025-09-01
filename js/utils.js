const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.random() * (upper - lower + 1) + lower;
};
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createId = () => {
  let id = 0;
  return () => {
    id += 1;
    return id;
  };
};

export { getRandomInteger };
export { getRandomArrayElement };
export { createId };
