const blockName = 'v2-hero';

export default function decorate(block) {
  const pictures = block.querySelectorAll('picture');
  const imgParent = pictures[0].parentElement;
  const heroContainer = imgParent.parentElement;
  const newPicture = document.createElement('picture');
  const mediaQueries = ['(max-width: 749px)', '(min-width: 750px)'];
  const MQ = window.matchMedia('(min-width: 750px)');
  const img = document.createElement('img');
  const title = block.querySelector('h1');

  heroContainer.classList.add(`${blockName}__container`);
  imgParent.classList.add(`${blockName}__img-container`);
  title.classList.add(`${blockName}__title`);

  mediaQueries.forEach((mediaQuery, index) => {
    const source = document.createElement('source');
    source.media = mediaQuery;
    source.srcset = pictures[index].querySelector('img').src;
    newPicture.appendChild(source);
    if (MQ.matches) {
      img.src = pictures[index].querySelector('img').src;
      img.alt = pictures[index].querySelector('img').alt;
    }
  });
  newPicture.appendChild(img);

  // Remove the old pictures
  pictures.forEach((picture) => picture.remove());

  imgParent.appendChild(newPicture);
}
