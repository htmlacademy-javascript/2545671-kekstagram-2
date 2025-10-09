import { closeModal } from './form.js';

const ALERT_SHOW_TIME = 5000;

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const successInner = document.querySelector('.success__inner');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const errorInner = document.querySelector('.error__inner');
const successMessageTemplate = successMessage.cloneNode(true);
const errorMessageTemplate = errorMessage.cloneNode(true);

const isEscapeKey = (evt) => evt.key === 'Escape';


const onScreenClick = (evt) => {
  if ((successInner && successInner.contains(evt.target)) || (errorInner && errorInner.contains(evt.target))) {
    return;
  }
  closeMessage();
};

const onEscKeydown = (evt) => {
  if (isEscapeKey) {
    evt.preventDefault();
    evt.stopPropagation();
    closeMessage();
  }
};

const showDataErrorMessage = () => {
  const dataErrorTemplate = dataError.cloneNode(true);
  document.body.append(dataErrorTemplate);

  setTimeout(() => {
    dataErrorTemplate.remove();
  }, ALERT_SHOW_TIME);
};

const showMessage = (messageTemplate, buttonSelector) => {
  document.body.append(messageTemplate);
  document.body.addEventListener('keydown', onEscKeydown);
  document.body.addEventListener('click', onScreenClick);
  messageTemplate.querySelector(buttonSelector).addEventListener('click', closeMessage);
};

function closeMessage() {
  successMessageTemplate.remove();
  errorMessageTemplate.remove();
  document.body.removeEventListener('keydown', onEscKeydown);
  document.body.removeEventListener('click', onScreenClick);
}

const onSendSuccess = () => {
  closeModal();
  showMessage(successMessageTemplate, '.success__button');
};

const onSendError = () => {
  showMessage(errorMessageTemplate, '.error__button');
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, showDataErrorMessage, onSendSuccess, onSendError, debounce };
