import { isEscapeKey } from './utils.js';
import { resetScalePicture, resetSlider } from './edit-picture.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const HASHTAGS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const SUBMIT_BUTTON_TEXT = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const form = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textComment = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const picturePreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextTag: 'div',
});

const openModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

const closeModal = () => {
  form.reset();
  resetScalePicture();
  resetSlider();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
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
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    picturePreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${picturePreview.src}')`;
    });
  }
  openModal();
};

let error = '';
const showErrorHashtag = () => error;

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

pristine.addValidator(textHashtags, validateHashtags, showErrorHashtag, false);
pristine.addValidator(textComment, validateComments, 'Введено более 140 символов', false);

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? SUBMIT_BUTTON_TEXT.SENDING : SUBMIT_BUTTON_TEXT.IDLE;
};

const setOnFormSubmit = (fn) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      toggleSubmitButton(true);
      await fn(new FormData(form));
      toggleSubmitButton(false);
    }
  });
};

uploadFile.addEventListener('change', onUploudFileOpen);
imgUploadCancel.addEventListener('click', onButtonCancel);

export { setOnFormSubmit, closeModal, pristine };
