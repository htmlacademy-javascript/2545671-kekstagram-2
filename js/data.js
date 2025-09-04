import { getRandomInteger } from './utils';
import { getRandomArrayElement } from './utils';
import { createId } from './utils';
import { COUNT_PICTURE, DESCRIPTION, MIN_LIKE, MAX_LIKE, MESSAGE, NAME } from './consts';

const createMessage = () => Array.from({ length: getRandomInteger(1, 2) },
  () => getRandomArrayElement(MESSAGE)).join(' ');

const getComments = (idComments) => {
  idComments = idComments();
  return {
    id: idComments,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(NAME)
  };
};


const createDescriptionPicture = (id, commentId) => {
  id = id();
  return {
    id: id,
    address: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInteger(MIN_LIKE, MAX_LIKE),
    comments: Array.from({ length: getRandomInteger(0, 30) }, () => getComments(commentId))
  };
};

const getPictures = () => {
  const newId = createId();
  const commentId = createId();
  return Array.from({ length: COUNT_PICTURE }, () => createDescriptionPicture(newId, commentId));
};

export { getPictures };
