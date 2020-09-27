export const convertTimestamp = (timestamp) => {
  const date = timestamp.toDate();
  const day =
    date.getDay() === new Date().getDay()
      ? 'Today'
      : date.toLocaleDateString(undefined, { weekday: 'short' });
  const dateString = `${day} at ${date.getHours()}:${date.getMinutes()}`;
  return dateString;
};
