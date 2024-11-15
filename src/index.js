// api_key=live_inJLMGHKCNMEJ19nLFMkKcqtRjR7LMBpjuuorBp2SaZdoLZbUPHqDsullzSXLS2L
import axios from "axios";
import {fetchBreeds} from './cat-api'
import {fetchCatByBreed} from './cat-api';

const setectCats = document.querySelector('.breed-select');
const cartInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

axios.defaults.headers.common["x-api-key"] = "live_inJLMGHKCNMEJ19nLFMkKcqtRjR7LMBpjuuorBp2SaZdoLZbUPHqDsullzSXLS2L";

fetchBreeds()
.then((data) => renderCatsList(data))
    .catch((error) => console.log(error));

function renderCatsList(data) {
    const markup = data
    .map((data) => {
      return `<option value="${data.id}">${data.name}</option>`;
    })
    .join("");
    setectCats.insertAdjacentHTML("beforeend", markup);
}

setectCats.addEventListener('change', onSearch);

function onSearch(evt){
evt.preventDefault()

const breedId = evt.target.value;

fetchCatByBreed(breedId)
.then((data) => renderCatCart(data))
.catch((error) => console.log(error));

}

function renderCatCart(data) {
    const cat = data[0];

    const markup = `<img src="${cat.url}" alt="${cat.breeds[0].name}" width="300"/>
                <p class="name">${cat.breeds[0].name}</p>
                <p class="description">${cat.breeds[0].description}</p>
                <p class="temperament">${cat.breeds[0].temperament}</p>`;

    cartInfo.innerHTML = markup;
}

