const BASE_URL = 'https://restcountries.com/v3.1/name'
const properties =  'fields=name,capital,population,flags,languages'

const fetchCountries = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/${name}?${properties}`);
    if (!response.ok) {
      throw new Error('Country not found!');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export default fetchCountries;