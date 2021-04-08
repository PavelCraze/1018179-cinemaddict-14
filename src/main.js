import {filterTemplate} from "./view/filter";
import {sortTemplate} from "./view/sort";
import {cardTemplate} from "./view/card";
import {markupTemplate} from "./view/markup";
import {popupTemplate} from "./view/popup";
import {rankTemplate} from "./view/rank";
import {showTemplate} from "./view/show";
import {generateFilmCards} from "./mock/film-data.js";


const NUMBER_OF_FILMS = 20;
const TOTAL_NUMBER_OF_CARDS = 5;
const TOP_FILMS = 2;
const RATED_FILMS = 2;
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const render = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

const films = generateFilmCards(NUMBER_OF_FILMS);

render(headerElement, rankTemplate());
render(mainElement, filterTemplate(films));
render(mainElement, sortTemplate());
render(mainElement, markupTemplate());

const cardWrapper = document.querySelector(`.films-list .films-list__container`);

let showingCards = TOTAL_NUMBER_OF_CARDS;

films.slice(0, showingCards)
  .forEach((film) => render(cardWrapper, cardTemplate(film), `beforeend`));


const filmWrapper = document.querySelector(`.films-list`);

render(filmWrapper, showTemplate());

const [topFilmsWrapper, ratedFilmsWrapper] = document.querySelectorAll(`.films-list--extra .films-list__container`);

for (let i = 0; i < TOP_FILMS; i++) {
  render(topFilmsWrapper, cardTemplate(films[i]));
}

for (let i = 0; i < RATED_FILMS; i++) {
  render(ratedFilmsWrapper, cardTemplate(films[i]));
}

const loadMoreButton = mainElement.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevCards = showingCards;
  showingCards = showingCards + TOTAL_NUMBER_OF_CARDS;

  films.slice(prevCards, showingCards)
    .forEach((film) => render(cardWrapper, cardTemplate(film), `beforeend`));

  if (showingCards >= films.length) {
    loadMoreButton.remove();
  }
});


render(footerElement, popupTemplate(films[0]));
