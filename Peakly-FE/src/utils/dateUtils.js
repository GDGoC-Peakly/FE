export const timeToMinutes = (dateString) => {
  if (!dateString) return 0;
  const date = new Date(dateString);
  return date.getHours() * 60 + date.getMinutes();
};

export const formatTimeLabel = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minStr = minutes < 10 ? '0' + minutes : minutes;
  return `${hours} : ${minStr} ${ampm}`;
};
