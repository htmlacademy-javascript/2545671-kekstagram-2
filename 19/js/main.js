import { renderPictures } from './rendering-picture.js';
import { setOnFormSubmit, onSendSuccess, onSendError } from './form.js';
import './edit-image';
import { getData, sendData } from './api.js';
import { showDataErrorMessage } from './utils.js';

getData(renderPictures, showDataErrorMessage);

setOnFormSubmit(async (photos) => {
  await sendData(onSendSuccess, onSendError, photos);
});
