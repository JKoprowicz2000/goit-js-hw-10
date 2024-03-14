import fetchCountries from './fetchCountries.js';

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryDetails = document.querySelector('.country-details');

const clearCountryList = () => {
  countryList.innerHTML = '';
};

const clearCountryDetails = () => {
  countryDetails.innerHTML = '';
};

const displayCountryList = (countries) => {
  clearCountryList();
  countries.forEach(country => {
    const listItem = document.createElement('li');
    listItem.textContent = country.name.common;
    listItem.addEventListener('click', () => displayCountryDetails(country));
    countryList.appendChild(listItem);
  });
};

const displayCountryDetails = (country) => {
  clearCountryDetails();
  const details = `
    <h2>${country.name.common}</h2>
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population}</p>
    <img src="${country.flags.png}" alt="Flag">
    <p>Languages: ${Object.values(country.languages).join(', ')}</p>
  `;
  countryDetails.innerHTML = details;
};

const searchCountries = async (event) => {
  const searchText = event.target.value.trim();
  if (searchText === '') {
    clearCountryList();
    clearCountryDetails();
    return;
  }
  try {
    const countries = await fetchCountries(searchText);
    if (countries.length > 10) {
      clearCountryDetails();
      countryList.innerHTML = '<li>Too many matches. Please specify your search.</li>';
    } else {
      displayCountryList(countries);
      clearCountryDetails();
    }
  } catch (error) {
    console.error('Error:', error.message);
    clearCountryList();
    clearCountryDetails();
    countryList.innerHTML = `<li>Error: ${error.message}</li>`;
  }
};

searchBox.addEventListener('input', searchCountries);