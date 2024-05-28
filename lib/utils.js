const createUrl = (pathame, params) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathame}${queryString}`;
};

const formatDateToString = (dateString) => {
  const date = new Date(dateString);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('id-ID', options);

  return formattedDate;
};

const utils = {
  createUrl,
  formatDateToString,
};

export default utils;
