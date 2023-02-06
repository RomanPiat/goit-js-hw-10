import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetch.js';

const DEBOUNCE_DELAY = 300;
const URL_COUNTRIES = `https://restcountries.com/v2/name/`;

// читаю форму
const refs = {
  countryInp: document.getElementById("search-box"),
  listEl: document.querySelector("ul"),
  listDivEl: document.querySelector("div"),
}

let input ='';
refs.countryInp.addEventListener('input', debounce((evt) => {
input = evt.target.value.trim(" ");
refs.listEl.innerHTML = '';

fetchCountries(URL_COUNTRIES, input)
.then(renderCountryCard)
.catch(error => {
  console.log('eror catch', error.message)
  if (error.message == 404){
    Notify.failure("Oops, there is no country with that name")
    refs.listDivEl.innerHTML = '';
  };
})
}, DEBOUNCE_DELAY));

function renderCountryCard(countryCard) {
  let markup = '';
  if (input == '') return
  if (countryCard.length > 10) {
    Notify.success("Too many matches found. Please enter a more specific name.")
    return
  }
  else if (countryCard.length > 1) {
     markup = markupCountries(countryCard);
     refs.listEl.innerHTML = markup;
     refs.listDivEl.innerHTML = '';
  } 
  else if (countryCard.length === 1) {
     markup = markupCountry(countryCard);
     refs.listDivEl.innerHTML = markup;
  }
}
// форма вывода карточки
 function markupCountry(item) {
  return item.map(item =>
    `<h1><li class="header"><img src="${item.flag}" alt="flag" width="80" height ="60">
  <p>  ${item.name}</p></h1><p> Capital: ${item.capital}</p><p> Population: ${item.population}</p><p> Languages: ${item.languages.map(lang => lang.name)}</p></li>`).join("");
} 
// форма вывода списка
  function markupCountries(items) {
  return items.map(item => `<li><img src="${item.flag}" alt="flag" width="40" height ="30">
          <p>  ${item.name}</p></li>`).join("");
} 
