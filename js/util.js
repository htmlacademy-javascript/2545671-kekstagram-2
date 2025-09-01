const getRandomInteger = (minValue, maxValue) => {
  const lower = Math.ceil(Math.min(minValue, maxValue));
  const upper = Math.floor(Math.max(minValue, maxValue));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
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
