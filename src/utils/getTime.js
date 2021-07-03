export const msToTime = (duration) => {
  const milliseconds = parseInt((duration % 1000) / 100);
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  return { seconds, minutes, hours, milliseconds };
}

export const minutesAndSeconds = (duration) => {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);

  const _seconds = (seconds < 10) ? "0" + seconds : seconds;
  return minutes + ":" + _seconds
}