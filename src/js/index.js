import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
const breedSelectElm = document.querySelector('.breed-select');
const loaderElm = document.querySelector('.loader');
const catInfoElm = document.querySelector('.cat-info');
function createBreedOptions() {
  breedSelectElm.classList.add('is-hidden');
  fetchBreeds()
    .then(data => {
      const optionELm = data
        .map(({ id, name }) => `<option value="${id}">${name}</option>`)
        .join('');
      breedSelectElm.insertAdjacentHTML('beforeend', optionELm);
      new SlimSelect({
        select: '.breed-select',
      });
      breedSelectElm.classList.remove('is-hidden');
      loaderElm.classList.add('is-hidden');
    })
    .catch(onError);
}
function createBreedMarkUp(e) {
  loaderElm.classList.replace('is-hidden', 'loader');
  catInfoElm.classList.add('is-hidden');
  fetchCatByBreed(e.target.value)
    .then(data => {
      const { url, breeds } = data[0];
      const { name, description, temperament } = breeds[0];
      catInfoElm.innerHTML = `
        <img src="${url}" alt="${name}"/>
        <div class="box">
          <h2>${name}</h2>
          <p>${description}</p>
          <p><span>Temperament:</span>${temperament}</p>
        </div>
      `;
      loaderElm.classList.replace('loader', 'is-hidden');
      catInfoElm.classList.remove('is-hidden');
    })
    .catch(onError);
}
function onError() {
  Notiflix.Notify.failure('Oops! Ceva a mers rău! Reîncarcă pagina!');
  breedSelectElm.classList.add('is-hidden');
  loaderElm.classList.add('is-hidden');
  catInfoElm.classList.add('is-hidden');
}
createBreedOptions();
breedSelectElm.addEventListener('change', createBreedMarkUp);
