import { isEscapeKey } from './utils';
import { renderComment, hideComment } from './rendering-comment';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
const likesCount = document.querySelector('.likes-count');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const socialCaption = document.querySelector('.social__caption');

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onBigPictureEscKlick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

function closeBigPicture() {
  hideComment();
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancel.removeEventListener('click', onBigPictureEscKlick);
  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

const openBigPicture = (pictureId, pictures) => {

  const newPictures = pictures.find((picture) => picture.id === Number(pictureId));

  likesCount.textContent = newPictures.likes;
  bigPictureImg.src = newPictures.url;
  likesCount.textContent = newPictures.likes;
  socialCaption.textContent = newPictures.description;

  renderComment(newPictures.comments);

  bigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', onBigPictureEscKlick);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureEscKeydown);
};

export { openBigPicture };
