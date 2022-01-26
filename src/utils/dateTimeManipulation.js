export const timeToAgo = ms => {
  const periods = {
    year: 12 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    min: 60 * 1000,
    second: 1000,
  };

  const diff = Date.now() - ms;
  // console.log(diff, ms);

  if (diff > periods.year) {
    return Math.floor(diff / periods.year) + ' year ago';
  } else if (diff > periods.month) {
    return Math.floor(diff / periods.month) + ' month ago';
  } else if (diff > periods.week) {
    return Math.floor(diff / periods.week) + ' week ago';
  } else if (diff > periods.day) {
    return Math.floor(diff / periods.day) + ' day ago';
  } else if (diff > periods.hour) {
    return Math.floor(diff / periods.hour) + ' hour ago';
  } else if (diff > periods.min) {
    return Math.floor(diff / periods.min) + ' min ago';
  } else if (diff > periods.second) {
    return Math.floor(diff / periods.second) + ' second ago';
  } else {
    return 'Just Now';
  }
};
