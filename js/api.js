const getData = async (onSuccess, onFail) => {
  const response = await fetch('https://31.javascript.htmlacademy.pro/kekstagram/data');
  try {
    if (!response.ok) {
      throw new Error('Фотографии не загрузились!');
    }
    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch('https://31.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body,
      });
    if (!response.ok) {
      throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
    }
    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
};

export { getData, sendData };
