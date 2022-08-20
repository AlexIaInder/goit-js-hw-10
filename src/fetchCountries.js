const FETCH_PATH = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  return fetch(`${FETCH_PATH}${name}`).then(res => res.json());
}
