import { openBigPicture } from './user-picture';
import { listPictures } from './rendering-picture';

listPictures.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');
  if (currentPicture) {
    openBigPicture(currentPicture.dataset.pictureId);
  }
});
