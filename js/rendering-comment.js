const COMMENT_SHOWN_COUNT = 5;
let currentIndex = 0;
let newComments = [];

const socialCommentsList = document.querySelector('.social__comments');
const commentsTemplate = socialCommentsList.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
socialCommentsList.innerHTML = '';

const onCommentClick = () => {

  const nextComments = newComments.slice(currentIndex, currentIndex + COMMENT_SHOWN_COUNT);
  const nextCommentLength = nextComments.length + currentIndex;

  const socialComments = [];
  nextComments.forEach((comment) => {
    const newCommentsTemplate = commentsTemplate.cloneNode(true);
    newCommentsTemplate.querySelector('.social__picture').src = comment.avatar;
    newCommentsTemplate.querySelector('.social__picture').alt = comment.name;
    newCommentsTemplate.querySelector('.social__text').textContent = comment.message;

    socialComments.push(newCommentsTemplate);
  });

  if (nextCommentLength >= newComments.length) {
    commentsLoader.classList.add('hidden');
    currentIndex = commentsLoader.length;
  }
  currentIndex += COMMENT_SHOWN_COUNT;
  socialCommentsList.append(...socialComments);
  socialCommentCount.textContent = `${nextCommentLength} из ${newComments.length} комментариев`;
};

const hideComment = () => {
  currentIndex = 0;
  socialCommentsList.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  socialCommentsList.removeEventListener('click', onCommentClick);
};

const renderComment = (currentComments) => {
  newComments = currentComments;
  onCommentClick();
  commentsLoader.addEventListener('click', onCommentClick);

};

export { renderComment, hideComment };
