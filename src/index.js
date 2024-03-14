// app.js
import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce';

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const clearCountryList = () => {
  countryList.innerHTML = '';
};

const clearCountryInfo = () => {
  countryInfo.innerHTML = '';
};

const displayCountryList = (countries) => {
  clearCountryList();
  if (countries.length > 10) {
    notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
  } else {
    countries.forEach(country => {
      const listItem = document.createElement('li');
      listItem.textContent = country.name.official;
      listItem.dataset.country = JSON.stringify(country);
      countryList.appendChild(listItem);
    });
  }
};

const displayCountryInfo = (country) => {
  const html = `
    <div>
      <h2>${country.name.official}</h2>
      <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Population:</strong> ${country.population}</p>
      <img src="${country.flags.svg}" alt="Flag">
      <p><strong>Languages:</strong> ${country.languages.map(lang => lang.name).join(', ')}</p>
    </div>
  `;
  countryInfo.innerHTML = html;
};

const searchCountries = async (name) => {
  try {
    const countries = await fetchCountries(name.trim());
    if (countries.length === 0) {
      clearCountryList();
      clearCountryInfo();
      notiflix.Notify.warning('Oops, there is no country with that name');
      return;
    }
    if (countries.length === 1) {
      clearCountryList();
      displayCountryInfo(countries[0]);
    } else {
      displayCountryList(countries);
      clearCountryInfo();
    }
  } catch (error) {
    console.error(error.message);
    notiflix.Notify.failure('Oops! Something went wrong. Please try again later.');
  }
};

searchBox.addEventListener('input', debounce(event => {
  const searchTerm = event.target.value.trim();
  if (searchTerm === '') {
    clearCountryList();
    clearCountryInfo();
    return;
  }
  searchCountries(searchTerm);
}, 300));