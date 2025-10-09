const checksLengthString = (string = '', maxLength = 1) => string.length <= maxLength;

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

const isWorkTime = (startWorkingDay, endWorkingDay, meetingStart, durationMeeting) => {
  const timeMinute = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startWorkingDayMinut = timeMinute(startWorkingDay);
  const endWorkingDayMinut = timeMinute(endWorkingDay);
  const meetingStartMinut = timeMinute(meetingStart);
  const durationEndMeetingMinute = meetingStartMinut + durationMeeting;

  return meetingStartMinut >= startWorkingDayMinut && endWorkingDayMinut >= durationEndMeetingMinute;
};
isWorkTime('8:00', '17:30', '14:00', 40);
isWorkTime('8:0', '10:0', '8:0', 120);
isWorkTime('08:00', '14:30', '14:00', 90);
isWorkTime('14:00', '17:30', '08:0', 90);
isWorkTime('8:00', '17:30', '08:00', 900);
