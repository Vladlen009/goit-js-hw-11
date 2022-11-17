import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './refs';
import galleryMarkup from '/templates/galleryMarkup.hbs';
// console.log('markup', markup);

function createGallery(images) {
  //   console.log('createGallery images', images);
  refs.galleryEl.insertAdjacentHTML('beforeend', galleryMarkup(images));

  const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
    close: false,
  });
  lightbox.refresh();
}

export default createGallery;

