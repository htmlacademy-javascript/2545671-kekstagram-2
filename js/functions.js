const checksLengthString = (string, maxLength) => {
  const result = string.length <= maxLength;
  return result;
};

checksLengthString('проверяемая строка', 20);
checksLengthString('проверяемая строка', 18);
checksLengthString('проверяемая строка', 10);

const checksString = (string) => {
  let result = string.replaceAll(' ', '');
  result = result.toLowerCase();
  let poliandr = '';

  for (let i = result.length - 1; i >= 0; i--) {
    poliandr += result[i];
  }
  return poliandr === result;

};

checksString('ДовОд');
