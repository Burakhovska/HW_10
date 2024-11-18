// api_key=live_inJLMGHKCNMEJ19nLFMkKcqtRjR7LMBpjuuorBp2SaZdoLZbUPHqDsullzSXLS2L
import axios from "axios";
import {fetchBreeds} from './cat-api'
import {fetchCatByBreed} from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';


const setectCats = document.querySelector('.breed-select');
const cartInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
export const error = document.querySelector('.error');

setectCats.hidden = true;
error.hidden = true;
loader.hidden = false;

axios.defaults.headers.common["x-api-key"] = "live_inJLMGHKCNMEJ19nLFMkKcqtRjR7LMBpjuuorBp2SaZdoLZbUPHqDsullzSXLS2L";

    
fetchBreeds()
.then((data) => {
    renderCatsList(data)
    setectCats.hidden = false;
    loader.hidden = true;
    new SlimSelect({
        select: '#single'
      })
})
.catch((err) => {
    Notiflix.Notify.failure(error.textContent)
    error.hidden = false; 
    loader.hidden = true;
});
    
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
loader.hidden = false;
const breedId = evt.target.value;

if(evt){
    loader.hidden = false;
    fetchCatByBreed(breedId)
    .then((data) => {
        renderCatCart(data);
        loader.hidden = true;
})
.catch((err) => {
    Notiflix.Notify.failure(error.textContent)
    error.hidden = false; 
    loader.hidden = true;
});
}


}

function renderCatCart(data) {
    const cat = data[0];

    const markup = `<div class="card" style="width: 18rem;">
                <img src="${cat.url}" class="card-img-top" alt="${cat.breeds[0].name}"/>
                <div class="card-body">
                <h5 class="card-title">${cat.breeds[0].name}</h5>
                <p class="card-text">${cat.breeds[0].description}</p>
                <p><strong>Temperament:</strong>${cat.breeds[0].temperament}</p>
                </div>
                </div>`;

    cartInfo.innerHTML = markup;
}


