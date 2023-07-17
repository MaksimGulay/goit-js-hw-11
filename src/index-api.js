import axios from 'axios';

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #KEY_API = '38305982-dc7dfa721766ad9459fc2b58c';

  currentPage = 1;
  query = null;
  perPage = 40;

  async fetchPhotos() {
    return await axios.get(`${this.#BASE_URL}`, {
      params: {
        key: this.#KEY_API,
        q: this.query,
        lang: 'un, ua',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: this.perPage,
        page: this.currentPage,
      },
    });
  }
}
