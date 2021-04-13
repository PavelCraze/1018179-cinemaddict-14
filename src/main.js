import Filter from "./view/filter";
import Sorting from "./view/sort";
import Card from "./view/card";
import Markup from "./view/markup";
import Popup from "./view/popup";
import Rank from "./view/rank";
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
const basicMarkup = new Markup();

const renderFilmCard = (filmListElement, film) => {
  const filmCard = new Card(film);
  const filmDetails = new Popup(film);

  const replaceFilmCardToDetails = () => {
    render(document.body, filmDetails.getElement());
    document.body.classList.add(`hide-overflow`);
  };

  const replaceDetailsToFilmCard = () => {
    document.body.removeChild(filmDetails.getElement());
    document.body.classList.remove(`hide-overflow`);
  };

  render(filmListElement, filmCard.getElement());

  filmCard._element.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceFilmCardToDetails();
  });

  const detailsClose = filmDetails.getElement().querySelector(`.film-details__close-btn`);
  detailsClose.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceDetailsToFilmCard();
  });
};

const renderFilmCards = (markup, filmsArray) => {
  const filmWrapper = document.querySelector(`.films-list`);
  const filmListElement = markup.getElement().querySelector(`.films-list .films-list__container`);
  let showingCards = TOTAL_NUMBER_OF_CARDS;

  filmsArray.slice(0, showingCards)
    .forEach((film) => {
      renderFilmCard(filmListElement, film);
    });

  const loadMoreButton = new LoadMoreButton();
  render(filmWrapper, loadMoreButton.getElement());

  loadMoreButton.getElement().addEventListener(`click`, () => {
    const prevCards = showingCards;
    showingCards = showingCards + TOTAL_NUMBER_OF_CARDS;

    filmsArray.slice(prevCards, showingCards)
      .forEach((film) => {
        renderFilmCard(filmListElement, film);
      });

    if (showingCards >= filmsArray.length) {
      loadMoreButton.getElement().remove();
      loadMoreButton.removeElement();
    }
  });

  const [topFilmsWrapper, ratedFilmsWrapper] = document.querySelectorAll(`.films-list--extra .films-list__container`);

  for (let i = 0; i < TOP_FILMS; i++) {
    render(topFilmsWrapper, new Card(filmsArray[i]).getElement());
  }

  for (let i = 0; i < RATED_FILMS; i++) {
    render(ratedFilmsWrapper, new Card(filmsArray[i]).getElement());
  }
};

render(headerElement, new Rank().getElement());

render(mainElement, new Filter(films).getElement());

render(mainElement, new Sorting().getElement());

render(mainElement, basicMarkup.getElement());

renderFilmCards(basicMarkup, films);
