import { DEFAULT_SCALE, STEP_SCALE, MIN_VALUE_SCALE, MAX_VALUE_SCALE, EFFECTS } from './consts.js';

const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const valueScale = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');

const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelectorAll('.effects__list input[type="radio"]');

valueScale.value = `${DEFAULT_SCALE}%`;

const onbuttonSmallerClick = () => {
  const currentValueScale = parseInt(valueScale.value, 10);
  let newValueScale = currentValueScale - STEP_SCALE;
  if (newValueScale < MIN_VALUE_SCALE) {
    newValueScale = MIN_VALUE_SCALE;
  }
  valueScale.value = `${newValueScale}%`;
  image.style.transform = `scale(${newValueScale / 100})`;
};

const onbuttonBiggerClick = () => {
  const currentValueScale = parseInt(valueScale.value, 10);
  let newValueScale = currentValueScale + STEP_SCALE;
  if (newValueScale > MAX_VALUE_SCALE) {
    newValueScale = MAX_VALUE_SCALE;
  }
  valueScale.value = `${newValueScale}%`;
  image.style.transform = `scale(${newValueScale / 100})`;
};

buttonSmaller.addEventListener('click', onbuttonSmallerClick);
buttonBigger.addEventListener('click', onbuttonBiggerClick);

let currentEffect = EFFECTS[0];

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
  connect: 'lower'
});

const applyFilter = (effect, value) => {
  if (effect.name === 'none') {
    image.style.filter = '';
  } else {
    image.style.filter = `${effect.filter}(${value}${effect.unit})`;
  }
};

const updateEffect = (effect) => {
  currentEffect = effect;
  if (effect.name === 'none') {

    sliderContainer.classList.add('hidden');
    image.style.filter = '';
  } else {

    sliderContainer.classList.remove('hidden');
    slider.noUiSlider.updateOptions({
      range: { min: effect.min, max: effect.max },
      start: effect.max,
      step: effect.step
    });

    applyFilter(effect, effect.max);
  }
};

effectsList.forEach((radio) => {
  radio.addEventListener('change', () => {
    const effectName = radio.value;
    const effect = EFFECTS.find((currentElement) => currentElement.name === effectName);
    updateEffect(effect);
  });
});

slider.noUiSlider.on('update', () => {
  const value = slider.noUiSlider.get();
  applyFilter(currentEffect, value);
});

sliderContainer.classList.add('hidden');
