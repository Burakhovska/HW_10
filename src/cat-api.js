import axios from "axios";
const BASE_URL = 'https://api.thecatapi.com/v1/';

 export function fetchBreeds(){
    return axios.get(`${BASE_URL}breeds/`)
    .then((response) => {
            return response.data; 
        })
    .catch((error) => {
        throw new Error(error.response ? error.response.status : error.message);
    });
}

export function fetchCatByBreed(breedId){
    return axios.get(`${BASE_URL}images/search?breed_ids=${breedId}`)
    .then((response) => {
            return response.data; 
        })
    .catch((error) => {
        throw new Error(error.response ? error.response.status : error.message);
    })

}
