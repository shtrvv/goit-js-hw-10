import axios from "axios";
axios.defaults.headers.common["x-api-key"] = 'live_hZrWEN8nsCOplCvPEwnhGkIxENUYd4aQ9G3xLdl8KvYMCkIFrdvmbtgrgTEriMvF';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
    return axios.get('/breeds').then(resp => {
        return resp.data;
    });
}

export function fetchCatByBreed(breedId) {
    return axios.get(`/images/search?breed_ids=${breedId}`).then(resp => {
        return resp.data;
    });
}
