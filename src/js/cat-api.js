import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_k55cO1RG3tz6qbS16IToVyKUvVco8v3NoJf2muWEhH2b4clyBzuERE9ksOfseH1V';
const JSON_CATHOLDER_URL = 'https://api.thecatapi.com/v1';
const CAT_API_KEY =
    'live_k55cO1RG3tz6qbS16IToVyKUvVco8v3NoJf2muWEhH2b4clyBzuERE9ksOfseH1V';
export async function fetchBreeds() {
    return (await axios.get(`${JSON_CATHOLDER_URL}/breeds?api_key=${CAT_API_KEY}`)).data;
        
}
export async function fetchCatByBreed(breedId) {
    return (await axios.get(`${JSON_CATHOLDER_URL}/images/search?api_key=${CAT_API_KEY}&breed_ids=${breedId}`)).data;
}

  

