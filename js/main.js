import { openBigPicture } from './big-picture';
import { listPictures } from './rendering-picture';
import './form';

listPictures.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');
  if (currentPicture) {
    evt.preventDefault();
    openBigPicture(currentPicture.dataset.pictureId);
  }
});

