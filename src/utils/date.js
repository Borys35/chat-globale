export const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp.seconds);
  console.log(date);
  return timestamp.toString();
};
