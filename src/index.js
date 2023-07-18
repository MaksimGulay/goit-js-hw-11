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

let imagesData = [];

loadMoreBtnEl.classList.add('is-hidden');

async function fetchAndRenderPhotos() {
  try {
    const searchQuery = searchFormEl.elements['searchQuery'].value.trim();
    pixabayAPI.query = searchQuery;
    pixabayAPI.currentPage = 1;

    if (searchQuery === '') {
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

    imagesData = data.hits;

    galleryEl.innerHTML = createGalleryCards(imagesData);
    loadMoreBtnEl.classList.remove('is-hidden');
    lightbox.refresh();
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  } catch (err) {
    Notiflix.Notify.failure(
      'Oops! Something went wrong. Please try again later.'
    );
  }
}

searchFormEl.addEventListener('submit', event => {
  event.preventDefault();
  const searchQuery = searchFormEl.elements['searchQuery'].value.trim();

  if (searchQuery === '') {
    Notiflix.Notify.failure('Please, type something and try again');
    clearGallery();
    imagesData = [];
    loadMoreBtnEl.classList.add('is-hidden');
    return;
  }

  fetchAndRenderPhotos();
});

async function loadMorePhotos() {
  try {
    pixabayAPI.currentPage += 1;

    const { data } = await pixabayAPI.fetchPhotos();
    const loadPages = Math.ceil(data.totalHits / pixabayAPI.perPage);
    console.log(loadPages);

    imagesData = [...imagesData, ...data.hits];

    galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));

    lightbox.refresh();

    if (imagesData.length < data.totalHits) {
      loadMoreBtnEl.classList.remove('is-hidden');
    } else {
      loadMoreBtnEl.classList.add('is-hidden');
      Notiflix.Notify.info('Sorry, there are no more images');
    }
  } catch (err) {
    console.log(err.message);
  }
}

loadMoreBtnEl.addEventListener('click', () => {
  loadMorePhotos();
});

clearGallery();

const darkModeToggleEl = document.getElementById('dark-mode-toggle');

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

darkModeToggleEl.addEventListener('click', toggleDarkMode);

function clearGallery() {
  galleryEl.innerHTML = '';
}
