import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const refs = {
    wrap: document.querySelector('.cat-info'),
    select: document.querySelector('.breed-select'),
    error: document.querySelector('.error'),
    loader: document.querySelector('.loader'),
}

refs.error.classList.add('is-hidden');

fetchBreeds()
    .then(data => {
        refs.select.innerHTML = createMarkupSelect(data);
        new SlimSelect({
        select: `.breed-select`,
    });
})
    .catch(() => {
        refs.select.classList.add('is-hidden');
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    
    })
    .finally(() => {
    refs.loader.classList.add('is-hidden');
})


refs.select.addEventListener('change', onSelectChange);

function onSelectChange(e) {
    const selectedCat = e.currentTarget.value;
    refs.wrap.classList.add('is-hidden');

    fetchCatByBreed(selectedCat)
        .then(data => {
            createMarkupWrap(data);
            refs.wrap.classList.remove('is-hidden');
    })
    .catch(() => {
        refs.select.classList.add('is-hidden');
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    
    })
    .finally(() => {
    refs.loader.classList.add('is-hidden');
})
}

function createMarkupSelect(arr) {
    return arr.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');
}

function createMarkupWrap(data) {
    const { url, breeds } = data[0];
    const { name, temperament, description } = breeds[0];
    const wrapMarkup = `
    <img src="${url}" alt="${name}" width="500px" class="img-cat" />
    <div class="information-cat">
        <h2 class="header">${name}</h2>
        <p class="descr">${description}</p>
        <p class="temper"><span class="span-word">Temperament:</span> ${temperament}</p>
    </div>`;
    refs.wrap.innerHTML = wrapMarkup;
}
