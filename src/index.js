'use strict';

import { PixabayAPI } from './index-api';
import createGalleryCards from './render_card';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const pixabayAPI = new PixabayAPI();
const lightbox = new SimpleLightbox('.card a');

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

loadMoreBtnEl.classList.add('is-hidden');

function clearGallery() {
  galleryEl.innerHTML = '';
}

async function fetchAndRenderPhotos() {
  try {
    const searchQuery = searchFormEl.elements['searchQuery'].value.trim();
    pixabayAPI.query = searchQuery;
    pixabayAPI.currentPage = 1;

    if (!searchQuery) {
      Notiflix.Notify.failure('Please, type something and try again');
      return;
    }

    const { data } = await pixabayAPI.fetchPhotos();

    if (!data.hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    searchFormEl.reset();

    galleryEl.innerHTML = createGalleryCards(data.hits);
    loadMoreBtnEl.classList.remove('is-hidden');
    lightbox.refresh();
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  } catch (err) {
    console.log(err.message);
  }
}

async function loadMorePhotos() {
  try {
    pixabayAPI.currentPage += 1;

    const { data } = await pixabayAPI.fetchPhotos();
    const loadPages = Math.ceil(data.totalHits / pixabayAPI.perPage);
    console.log(loadPages);

    galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));

    lightbox.refresh();

    if (galleryEl.children.length === data.totalHits) {
      loadMoreBtnEl.classList.add('is-hidden');
      Notiflix.Notify.warning(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  } catch (err) {
    console.log(err.message);
  }
}

searchFormEl.addEventListener('submit', event => {
  event.preventDefault();
  fetchAndRenderPhotos();
});

loadMoreBtnEl.addEventListener('click', () => {
  loadMorePhotos();
});

clearGallery();

const darkModeToggleEl = document.getElementById('dark-mode-toggle');

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

darkModeToggleEl.addEventListener('click', toggleDarkMode);
