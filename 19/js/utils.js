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

const showSuccessMessage = () => {
  document.body.append(successMessageTemplate);
  document.body.addEventListener('keydown', onEscKeydown);
  document.body.addEventListener('click', onScreenClick);
  successMessageTemplate.querySelector('.success__button').addEventListener('click', closeMessage);
};

const showErrorMessage = () => {
  document.body.append(errorMessageTemplate);
  document.body.addEventListener('keydown', onEscKeydown);
  document.body.addEventListener('click', onScreenClick);
  errorMessageTemplate.querySelector('.error__button').addEventListener('click', closeMessage);
};

function closeMessage() {
  successMessageTemplate.remove();
  errorMessageTemplate.remove();
  document.body.removeEventListener('keydown', onEscKeydown);
  document.body.removeEventListener('click', onScreenClick);
}

export { isEscapeKey, showDataErrorMessage, showSuccessMessage, showErrorMessage };
