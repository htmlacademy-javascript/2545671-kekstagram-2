import { pictures } from './rendering-picture';
import { isEscapeKey } from './utils';
import { bigPicture, bigPictureImg, likesCount, bigPictureCancel, body, socialCaption } from './consts';
import { renderingComment, hideComment } from './rendering-comment';


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
  body.classList.remove('modal-open');
  bigPictureCancel.removeEventListener('click', onBigPictureEscKlick);
  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

const openBigPicture = (pictureId) => {

  const newPictures = pictures.find((picture) => picture.id === Number(pictureId));

  likesCount.textContent = newPictures.likes;
  bigPictureImg.src = newPictures.address;
  likesCount.textContent = newPictures.likes;
  socialCaption.textContent = newPictures.description;

  renderingComment(newPictures.comments);

  bigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', onBigPictureEscKlick);
  body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureEscKeydown);
};

export { openBigPicture };
