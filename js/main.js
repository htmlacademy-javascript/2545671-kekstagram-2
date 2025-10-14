
import { setOnFormSubmit } from './form.js';
import { getData, sendData } from './api.js';
import { showDataErrorMessage, onSendSuccess, onSendError } from './utils.js';
import { onGetDataSuccess } from './filter.js';

getData(onGetDataSuccess, showDataErrorMessage);

setOnFormSubmit(async (photos) => {
  await sendData(onSendSuccess, onSendError, photos);
});
