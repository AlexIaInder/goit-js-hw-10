import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', e => {
  const value = e.target.value;
  fetchCountries(value).then(countries => {
    if (countries.length === 1) {
      const [country] = countries;

      renderCountry({
        name: country.name.official,
        capital: country.capital,
        population: country.population,
        flagURL: country.flags.svg,
        languages: Object.values(country.languages),
      });
    } else {
      renderList(
        countries.map(country => ({
          name: country.name.official,
          flagURL: country.flags.svg,
        }))
      );
    }
  });
});

function renderCountry({ name, capital, population, flagURL, languages }) {
  countryList.innerHTML = '';

  const htmlString = `
    <div class="top-country">
      <img src="${flagURL}" alt="${name}"/>
      <h1>${name}</h1>
    </div>
    <p><b>Capital:</b> ${capital}</p>
    <p><b>Population:</b> ${population}</p>
    <p><b>Languages:</b> ${languages.join(', ')}</p>
  `;

  countryInfo.innerHTML = htmlString;
}

function renderList(list) {
  countryInfo.innerHTML = '';

  for (const { flagURL, name } of list) {
    const liElem = document.createElement('li');
    liElem.innerHTML = `
      <img src="${flagURL}" alt="${name}"/>
      ${name}
    `;

    countryList.append(liElem);
  }
}
