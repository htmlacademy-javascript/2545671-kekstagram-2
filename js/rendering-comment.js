import {
  socialCommentsList, commentsTemplate, COMMENT_SHOWN_COUNT,
  commentsLoader, socialCommentCount
} from './consts';

let currentIndex = 0;
let newComments = [];
socialCommentsList.innerHTML = '';

const createComment = () => {
  const nextComment = newComments.slice(currentIndex, currentIndex + COMMENT_SHOWN_COUNT);
  const nextCommentLength = nextComment.length + currentIndex;

  const socialComments = [];
  nextComment.forEach((comment) => {
    const newCommentsTemplate = commentsTemplate.cloneNode(true);
    newCommentsTemplate.querySelector('.social__picture').src = comment.avatar;
    newCommentsTemplate.querySelector('.social__picture').alt = comment.name;
    newCommentsTemplate.querySelector('.social__text').textContent = comment.message;

    socialComments.push(newCommentsTemplate);
  });

  socialCommentsList.append(...socialComments);
  socialCommentCount.textContent = `${nextCommentLength} из ${newComments.length} комментариев`;

  if (nextCommentLength >= newComments.length) {
    commentsLoader.classList.add('hidden');
  }
  currentIndex += COMMENT_SHOWN_COUNT;
};

const hideComment = () => {
  currentIndex = 0;
  socialCommentsList.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  socialCommentsList.removeEventListener('click', createComment);
};

const renderingComment = (currentComments) => {
  newComments = currentComments;
  createComment();

  commentsLoader.addEventListener('click', createComment);
};

export { renderingComment, hideComment };
