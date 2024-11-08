const blockName = 'cards-multitab';

function decorateTabs(block) {
  const tabsContainer = block.querySelector(':scope > div:first-child');
  const tabsWrapper = tabsContainer.firstElementChild;
  const tabsList = tabsWrapper.firstElementChild;
  const activeItem = tabsList.querySelector(':scope > li:first-child');

  tabsContainer.classList.add(`${blockName}__tabs-container`);
  tabsWrapper.classList.add(`${blockName}__tabs-wrapper`);
  tabsList.classList.add(`${blockName}__tabs`);
  activeItem.classList.add(`${blockName}__tab--active`);

  tabsList.addEventListener('click', (e) => {
    if (e.target.tagName !== 'A') return;
    e.preventDefault();
    const activeTab = tabsList.querySelector(`.${blockName}__tab--active`);
    if (e.target === activeTab) return;
    activeTab.classList.remove(`${blockName}__tab--active`);
    e.target.parentElement.classList.add(`${blockName}__tab--active`);
    const cardContainer = block.querySelector(`.${blockName}__card-container`);
    const cards = cardContainer.querySelectorAll(`.${blockName}__card`);
    const cardId = e.target.getAttribute('title');
    cards.forEach((card) => {
      const isActive = card.getAttribute('name') === cardId;
      card.classList.toggle(`${blockName}__card--disabled`, !isActive);
    });
  });
}

function buildCardContainer() {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add(`${blockName}__card-container`);
  return cardContainer;
}

function decorateCards(block) {
  const activeTab = block.querySelector(`.${blockName}__tab--active a`);
  const cardsContainer = buildCardContainer();
  const cards = block.querySelectorAll(':scope > div:not(:first-child)');
  cards.forEach((card) => {
    const cardId = card.lastElementChild.textContent;
    card.classList.add(`${blockName}__card`);
    card.setAttribute('name', cardId);
    if (cardId !== activeTab.getAttribute('title')) {
      card.classList.add(`${blockName}__card--disabled`);
    }
    card.lastElementChild.remove();
    card.querySelector(':scope a').classList.remove('button');
  });
  cardsContainer.append(...cards);
  block.append(cardsContainer);
}

export default function decorate(block) {
  // tabs
  decorateTabs(block);

  // cards items
  decorateCards(block);
}
