const COUNT_PICTURE = 25;
const DESCRIPTION = [
  'Курортный пляж',
  'Указатель с надписью: GO TO THE BEACH',
  'Берег моря',
  'Девушка с фотоаппаратом на море',
  'Две порции супчика с рисовыми человечками',
  'Черная машина',
  'Разрезанная клубничка',
  'Два стакана морса на фоне ягодок',
  'Летящий самолет над пляжем',
  'Открытая обувница',
  'Тропинка вдоль деревянного заборчика',
  'Белая ауди',
  'Овощное блюдо с филе рыбы',
  'Которолл',
  'Реклама домашних сапожек серого цвета',
  'Голубое небо над горами',
  'Хор поющий со сцены',
  'Раритетная машина красного цвета',
  'Женщина в тапочках с фонариками на ногах',
  'Пальмы на фоне освещенных зданий',
  'Курочка с овощами и лимоном на тарелке',
  'Вечерний закат на фоне моря',
  'Живой краб',
  'Полный зал людей на выступлении певца',
  'Бегемоты которые охотятся на внедорожник проезжающий реку'
];
const minLike = 15;
const maxLike = 200;
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];
const NAME = [
  'Алексей Иванов',
  'Василий Петров',
  'Артем Лебедев',
  'Ольга Вершинина',
  'Аврора Закамалдина',
  'Светлана Сидорова',
  'Екатерина Полянская',
  'Мира Вселенская',
  'Антон Попов',
  'Вечаслав Варгин',
  'Роман Ступин',
  'Руслан Черных',
  'Полина Мослякова',
  'Томара Калиновская',
  'Петр Дранго',
  'Владимир Сычев'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
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

const createMessage = () => Array.from({ length: getRandomInteger(1, 2) }, () => getRandomArrayElement(MESSAGE)).join(' ');

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
    likes: getRandomInteger(minLike, maxLike),
    comments: Array.from({ length: getRandomInteger(0, 30) }, () => getComments(commentId))
  };
};

const getPictures = () => {
  const newId = createId();
  const commentId = createId();
  return Array.from({ length: COUNT_PICTURE }, () => createDescriptionPicture(newId, commentId));
};

getPictures();
