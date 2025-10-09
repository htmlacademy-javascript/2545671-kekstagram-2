import { debounce } from './utils.js';
import { SORT_FUNCTION, FILTER, PICTURES_COUNT } from './consts.js';
import { renderPictures } from './rendering-picture.js';

const imgFilters = document.querySelector('.img-filters');
const FILTERS__BUTTON_ACTIVE = 'img-filters__button--active';

let pictures = [];
let currentFilter = '';

const connectFilters = (photos) => {
  imgFilters.classList.remove('img-filters--inactive');
  pictures = [...photos];
  currentFilter = FILTER.default;
};

const filterPictures = () => {
  switch (currentFilter) {
    case FILTER.random:
      return [...pictures].sort(SORT_FUNCTION.random).slice(0, PICTURES_COUNT);
    case FILTER.discussed:
      return [...pictures].sort(SORT_FUNCTION.discussed);
    default:
      return [...pictures];
  }
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
};

export { onGetDataSuccess };
