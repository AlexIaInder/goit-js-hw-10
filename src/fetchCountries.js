const FETCH_PATH = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  return fetch(`${FETCH_PATH}${name}`).then(res => {
    if (res.ok) {
      return res.json();
    }

    if (res.status === 404) {
      throw new Error('Oops, there is no country with that name');
    }

    throw new Error('Something went wrong');
  });
}
