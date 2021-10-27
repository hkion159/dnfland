export function getDate(dateTime) {
  const today = new Date();
  const nowYear = today.getFullYear();
  const [front, back] = dateTime.split('T');
  const [year, month, date] = front.split('-');
  const result =
    (year == nowYear ? '' : year + '년 ') + month + '월 ' + date + '일 ';
  return result;
}

export function getDateTime(dateTime) {
  const [front, back] = dateTime.split('T');
  const [hour, minute, secondPlus] = back.split(':');
  const [second] = secondPlus.split('.');
  const date = getDate(dateTime);
  const result = date + ' ' + hour + '시 ' + minute + '분 ' + second + '초';
  return result;
}
