const listPictures = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureFragment = document.createDocumentFragment();

const renderPictures = (pictures) => {
  listPictures.querySelectorAll('.picture').forEach((element) => element.remove());
  pictures.forEach((picture) => {
    const newPicture = picturesTemplate.cloneNode(true);

    newPicture.dataset.pictureId = picture.id;
    newPicture.querySelector('.picture__img').src = picture.url;
    newPicture.querySelector('.picture__img').alt = picture.description;
    newPicture.querySelector('.picture__likes').textContent = picture.likes;
    newPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureFragment.append(newPicture);
  });

  listPictures.append(pictureFragment);
};

export { listPictures, renderPictures };
