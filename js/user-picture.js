import { pictures } from './rendering-picture';
import { isEscapeKey } from './utils';

const COMMENT_SHOWN_COUNT = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentShown = bigPicture.querySelector('social__comment-shown-count');
const socialCommentTotal = bigPicture.querySelector('.social__comment-total-count');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const commentsTemplate = socialCommentsList.querySelector('.social__comment');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('.modal-open');
  bigPictureCancel.removeEventListener('click', onBigPictureEscKlick);
  document.removeEventListener('keydown', onBigPictureEscKeydown);
};

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onBigPictureEscKlick = () => {
  closeBigPicture();
};

const createComments = (comments) => {

  socialCommentsList.innerHTML = '';
  const socialComments = [];
  comments.forEach((itemComment) => {
    const newCommentsTemplate = commentsTemplate.cloneNode(true);
    newCommentsTemplate.querySelector('.social__picture').src = itemComment.avatar;
    newCommentsTemplate.querySelector('.social__picture').alt = itemComment.name;
    newCommentsTemplate.querySelector('.social__text').textContent = itemComment.message;

    socialComments.push(newCommentsTemplate);
  });
  socialCommentsList.append(...socialComments);
};

const openBigPicture = (pictureId) => {
  const newPictures = pictures.find((picture) => picture.id === Number(pictureId));
  likesCount.textContent = newPictures.likes;
  bigPictureImg.src = newPictures.address;
  likesCount.textContent = newPictures.likes;
  socialCaption.textContent = newPictures.description;
  createComments(newPictures.comments);
  socialCommentTotal.textContent = newPictures.comments.length;
  if (socialCommentTotal.textContent <= COMMENT_SHOWN_COUNT) {
    socialCommentShown.textContent = newPictures.comments.length;
  }
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', onBigPictureEscKlick);
  body.classList.add('.modal-open');
  document.addEventListener('keydown', onBigPictureEscKeydown);
};

export { openBigPicture };
