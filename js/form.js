import { isEscapeKey } from './utils';

const form = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const body = document.querySelector('body');
const textHashtags = document.querySelector('.text__hashtags');
const textComment = document.querySelector('.text__description');

const HASHTAGS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const openModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

const closeModal = () => {
  form.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
};

const isTextFocused = () => document.activeElement === textHashtags || document.activeElement === textComment;

function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (isTextFocused()) {
      evt.stopPropagation();
    } else {
      closeModal();
    }
  }
}

const onButtonCancel = () => {
  closeModal();
};

const onUploudFileOpen = () => {
  openModal();
};

let error = '';
const errorHashtag = () => error;

const validateHashtags = (value) => {

  const tags = value.trim().split(/\s+/).filter((tag) => tag !== '');

  if (tags.length > MAX_HASHTAGS_COUNT) {
    error = 'Превышено количество хэштегов';
    return false;
  }

  for (const tag of tags) {
    if (!HASHTAGS.test(tag)) {
      error = 'Неверно введены хэштеги';
      return false;
    }
  }

  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  const uniqueTags = new Set(lowerCaseTags);
  if (uniqueTags.size !== lowerCaseTags.length) {
    error = 'Хэштеги повторяются';
    return false;
  }

  return true;
};

const validateComments = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(textHashtags, validateHashtags, errorHashtag, false);
pristine.addValidator(textComment, validateComments, 'Введено более 140 символов', false);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

uploadFile.addEventListener('change', onUploudFileOpen);
imgUploadCancel.addEventListener('click', onButtonCancel);
form.addEventListener('submit', onFormSubmit);
