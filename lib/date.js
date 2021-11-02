export function getDate(dateTime) {
  const today = new Date();
  const nowYear = today.getFullYear();
  const [front, back] = dateTime.split('T');
  const [year, month, date] = front.split('-');
  const result = (year == nowYear ? '' : year + '년 ') + month + '월 ' + date + '일 ';
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

export function getDateDiff(dateTime) {
  const past = new Date(dateTime);
  const now = new Date();
  const dateDiff = now.getTime() - past.getTime();
  const secondsDiff = Math.floor(dateDiff / 1000);
  if (secondsDiff < 60) return `${secondsDiff}초 전`;
  const minutesDiff = Math.floor(dateDiff / (1000 * 60));
  if (minutesDiff < 60) return `${minutesDiff}분 전`;
  const hoursDiff = Math.floor(dateDiff / (1000 * 60 * 60));
  if (hoursDiff < 24) return `${hoursDiff}시간 전`;
  const datesDiff = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  if (datesDiff < 30) return `${datesDiff}일 전`;
  const monthsDiff = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 30));
  if (monthsDiff < 12) return `${monthsDiff}달 전`;
  const yearsDiff = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 30 * 12));
  return `${yearsDiff}년 전`;
}
