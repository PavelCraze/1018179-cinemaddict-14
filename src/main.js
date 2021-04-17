import Filter from "./view/filter";
import Sorting from "./view/sort";
import FilmCard from "./view/film-card";
import ContentContainer from "./view/content-container";
import Popup from "./view/popup";
import Rank from "./view/rank";
import ListEmpty from "./view/list-empty";
import LoadMoreButton from "./view/show";
import {generateFilmCards} from "./mock/film-data";
import {render} from "./util";


const NUMBER_OF_FILMS = 20;
const TOTAL_NUMBER_OF_CARDS = 5;
const TOP_FILMS = 2;
const RATED_FILMS = 2;
const films = generateFilmCards(NUMBER_OF_FILMS);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const basicMarkup = new ContentContainer();

const renderFilmCard = (filmListElement, film) => {
  const filmCard = new FilmCard(film);
  const popup = new Popup(film);

  render(filmListElement, filmCard.getElement());

  filmCard.setClickHandler(() => {
    replaceFilmCardToDetails(popup);
  });

  document.addEventListener(`keydown`, (evt) => {
    const key = evt.key;
    if (key === `Escape`) {
      replaceDetailsToFilmCard(popup);
    }
  });

  popup.setCloseButtonClickHandler(() => {
    replaceDetailsToFilmCard(popup);
  });
};

const replaceFilmCardToDetails = (el) => {
  render(document.body, el.getElement());
  document.body.classList.add(`hide-overflow`);
};

const replaceDetailsToFilmCard = (el) => {
  document.body.removeChild(el.getElement());
  document.body.classList.remove(`hide-overflow`);
};

// eslint-disable-next-line no-shadow
const renderFilmCards = (markup, films) => {
  const filmWrapper = document.querySelector(`.films-list`);
  const filmListElement = markup.getElement().querySelector(`.films-list .films-list__container`);
  const listEmpty = new ListEmpty();
  let showingCards = TOTAL_NUMBER_OF_CARDS;

  if (NUMBER_OF_FILMS === 0) {
    render(filmListElement, listEmpty.getElement());
  } else {

    films.slice(0, showingCards)
    .forEach((film) => {
      renderFilmCard(filmListElement, film);
    });

    const loadMoreButton = new LoadMoreButton();
    render(filmWrapper, loadMoreButton.getElement());

    loadMoreButton.getElement().addEventListener(`click`, () => {
      const prevCards = showingCards;
      showingCards = showingCards + TOTAL_NUMBER_OF_CARDS;

      films.slice(prevCards, showingCards)
      .forEach((film) => {
        renderFilmCard(filmListElement, film);
      });

      if (showingCards >= films.length) {
        loadMoreButton.getElement().remove();
        loadMoreButton.removeElement();
      }
    });

    const [topFilmsWrapper, ratedFilmsWrapper] = document.querySelectorAll(`.films-list--extra .films-list__container`);

    for (let i = 0; i < TOP_FILMS; i++) {
      render(topFilmsWrapper, new FilmCard(films[i]).getElement());
    }

    for (let i = 0; i < RATED_FILMS; i++) {
      render(ratedFilmsWrapper, new FilmCard(films[i]).getElement());
    }
  }
};

render(headerElement, new Rank().getElement());

render(mainElement, new Filter(films).getElement());

render(mainElement, new Sorting().getElement());

render(mainElement, basicMarkup.getElement());

renderFilmCards(basicMarkup, films);
