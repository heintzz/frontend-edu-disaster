import { ReadonlyURLSearchParams } from 'next/navigation';

export const createUrl = (pathame, params) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathame}${queryString}`;
};
