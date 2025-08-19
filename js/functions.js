const checksLengthString = (string, maxLength) => string.length <= maxLength;

checksLengthString('проверяемая строка', 20);
checksLengthString('проверяемая строка', 18);
checksLengthString('проверяемая строка', 10);

const isPalindrome = (string) => {
  let poliandrome = '';

  const result = string.replaceAll(' ', '').toLowerCase();
  for (let i = result.length - 1; i >= 0; i--) {
    poliandrome += result[i];
  }
  return poliandrome === result;
};

isPalindrome('ДовОд');

const extractsNumbers = (string) => {
  let result = '';

  string = string.toString();

  for (let i = 0; i <= string.length - 1; i++) {
    if (Number.isNaN(parseInt(string[i], 10)) === false) {
      result += string[i];
    }
  }
  return result === '' ? NaN : Number(result);
};

extractsNumbers('2023 год');
