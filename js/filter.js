import { debounce } from './utils.js';
import { SORT_FUNCTION, FILTER, PICTURES_COUNT } from './consts.js';
import { listPictures, renderPictures } from './rendering-picture.js';
import { openBigPicture } from './big-picture.js';

const FILTERS__BUTTON_ACTIVE = 'img-filters__button--active';
const imgFilters = document.querySelector('.img-filters');

const pictures = [];
let currentFilter = '';

const filterPictures = () => {
  switch (currentFilter) {
    case FILTER.random:
      return [...pictures].sort(SORT_FUNCTION.getRandom).slice(0, PICTURES_COUNT);
    case FILTER.discussed:
      return [...pictures].sort(SORT_FUNCTION.discussed);
    default:
      return [...pictures];
  }
};

const connectFilters = (photos) => {
  imgFilters.classList.remove('img-filters--inactive');
  pictures.length = 0;
  pictures.push(...photos);
  currentFilter = FILTER.default;
};

const filterByClick = (cb) => {
  const debounceCallback = debounce(cb);

  imgFilters.addEventListener('click', (evt) => {
    const targetButton = evt.target;

    if (!targetButton.classList.contains('img-filters__button')) {
      return;
    }
    if (targetButton.id === currentFilter) {
      return;
    }

    imgFilters.querySelector(`.${FILTERS__BUTTON_ACTIVE}`).classList.remove(FILTERS__BUTTON_ACTIVE);
    targetButton.classList.add(FILTERS__BUTTON_ACTIVE);
    currentFilter = targetButton.id;
    debounceCallback(filterPictures());
  });
};

const onGetDataSuccess = (photos) => {
  connectFilters(photos);
  renderPictures(filterPictures());
  filterByClick(renderPictures);
  listPictures.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');
    if (currentPicture) {
      evt.preventDefault();
      openBigPicture(currentPicture.dataset.pictureId, pictures);
    }
  });
};

export { onGetDataSuccess };
