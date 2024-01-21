export const timeString = () => {
  const d = new Date();
  const hh = `${d.getHours()}`.padStart(2, '0');
  const mm = `${d.getMinutes()}`.padStart(2, '0');
  const ss = `${d.getSeconds()}`.padStart(2, '0');
  const ms = `${d.getMilliseconds()}`.padStart(3, '0');

  return `${hh}:${mm}:${ss}.${ms}`;
};
