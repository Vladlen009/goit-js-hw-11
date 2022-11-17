import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import refs from './js/refs';
import fetchData from './js/fetch';
import createGallery from './js/createGallery';



refs.loadMore.setAttribute('hidden', 'hidden');
refs.form.addEventListener('submit', onClickBtnSubmit);
refs.loadMore.addEventListener('click', onClickAddPage);



let value = null;
let page = 1;

function onClickBtnSubmit(event) {
  event.preventDefault();
  page = 1;

  value = refs.input.value.toLowerCase().trim();

  if (!value) {
    clearInput();
    // refs.loadMore.setAttribute('hidden', 'hidden');
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    return;
  } else {
    clearInput();
    event.target.reset();
    fetchData(value, page)
      .then(checkResponce)
      .catch(error => console.log(error));
  }
}

function onClickAddPage() {
  page += 1;
  fetchData(value, page)
    .then(responce => onLoadMoreImages(responce, page))
    .catch(error => console.log(error));
}

function checkResponce(responce) {
  // console.log(responce);
  const responceHits = responce.hits;
  const responceTotalHits = responce.totalHits;

  if (responceHits.length !== 0) {
    Notiflix.Notify.success(`Hooray! We found ${responceTotalHits} images`);
    createGallery(responceHits);
    refs.loadMore.removeAttribute('hidden');
  } else {
    clearInput();
    refs.loadMore.setAttribute('hidden', 'hidden');
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
}



function onLoadMoreImages(responce, page) {
  const responceHits = responce.hits;
  const responceTotalHits = responce.totalHits;
  const totalPages = responceTotalHits / 40;

  if (page > totalPages) {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    refs.loadMore.setAttribute('hidden', 'hidden');
  }
  createGallery(responceHits);
  smoothScroll();
}

function clearInput() {
  refs.galleryEl.innerHTML = '';
}

function smoothScroll() {
  const { height: cardHeight } = refs.galleryEl.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
