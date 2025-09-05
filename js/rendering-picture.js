import { getPictures } from './data';

const listPictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const pictures = getPictures();
const pictureFragment = document.createDocumentFragment();

pictures.forEach(({ address, description, likes, comments }) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = address;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  pictureFragment.append(picture);
});

listPictures.append(pictureFragment);
