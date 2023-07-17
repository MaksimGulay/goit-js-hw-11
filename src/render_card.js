// export default function createGalleryCards(images) {
//   return images
//     .map(image => {
//       const {
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       } = image;

//       return `
//     <div class="card">
//   <a class='card__link' href='${largeImageURL}'><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
//   <div class="info">
//     <p class="info_item">
//       <b>LIKES:</b>
//       <b>${likes}</b>
//     </p>
//     <p class="info_item">
//       <b>VIEWS:</b>
//       <b>${views}</b>
//     </p>
//     <p class="info_item">
//       <b>COMMENTS:</b>
//       <b>${comments}</b>
//     </p>
//     <p class="info_item">
//       <b>DOWNLOADS:</b>
//       <b>${downloads}</b>
//     </p>
//   </div>
// </div>`;
//     })
//     .join('');
// };

export default function createGalleryCards(images) {
  return images
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      // Відповідні HTML-коди символів
      const likeIcon = '❤️';
      const viewIcon = '👀';
      const commentIcon = '💬';
      const downloadIcon = '⬇️';

      return `
    <div class="card">
  <a class='card__link' href='${largeImageURL}'><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info_item">
      <b>${likeIcon}:</b>
      <b>${likes}</b>
    </p>
    <p class="info_item">
      <b>${viewIcon}:</b>
      <b>${views}</b>
    </p>
    <p class="info_item">
      <b>${commentIcon}:</b>
      <b>${comments}</b>
    </p>
    <p class="info_item">
      <b>${downloadIcon}:</b>
      <b>${downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');
}
