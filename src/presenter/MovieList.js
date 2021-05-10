import Filter from "../view/filter";
import Sorting from "../view/sort";
import MoviePresenter from "./Movie";
import ContentContainer from "../view/content-container";
import ListEmpty from "../view/list-empty";
import LoadMoreButton from "../view/show";
import {render, updateItem} from "../util";

const CARDS_COUNT_PER_STEP = 5;

export default class MovieListPresenter {
  constructor(moviesContainer) {
    this._moviesContainer = moviesContainer;
    this._renderedCards = CARDS_COUNT_PER_STEP;
    this._filmCard = {};

    this._contentContainer = new ContentContainer();
    this._listEmpty = new ListEmpty();
    this._loadMoreButton = new LoadMoreButton();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init(filmsList) {
    this._filmsList = filmsList.slice();
    this._renderFilter(this._filmsList);
    this._renderSort();
    render(this._moviesContainer, this._contentContainer);
    this._renderFilmsList(this._filmsList);
    this. _renderTopRatedFilms(filmsList);
  }

  _renderFilter(filmsList) {
    this._filter = new Filter(filmsList);
    render(this._moviesContainer, this._filter);
  }

  _renderSort() {
    this._sorting = new Sorting();
    render(this._moviesContainer, this._sorting);
  }

  _renderFilmCard(film) {
    const filmListElement = document.querySelector(`.films-list .films-list__container`);
    const filmCard = new MoviePresenter(filmListElement, this._handleFilmChange);
    filmCard.init(film);
    this._filmCard[film.id] = filmCard;
  }

  _renderFilmCards(from, to) {
    this._filmsList
      .slice(from, to)
      .forEach((filmCard) => this._renderFilmCard(filmCard));
  }

  _renderEmptyList() {
    render(this._moviesContainer, this._listEmpty);
  }

  _handleFilmChange(updatedFilm) {
    this._filmsList = updateItem(this._filmsList, updatedFilm);
    this._filmCard[updatedFilm.id].init(updatedFilm);
  }

  _handleLoadMoreButtonClick() {
    this._renderFilmCards(this._renderedCards, this._renderedCards + CARDS_COUNT_PER_STEP);
    this._renderedCards += CARDS_COUNT_PER_STEP;
    if (this._renderedCards >= this._filmsList.length) {
      this._loadMoreButton.remove();
      this._loadMoreButton.removeElement();
    }
  }

  _renderLoadMoreButton() {
    const filmWrapper = document.querySelector(`.films-list`);
    render(filmWrapper, this._loadMoreButton);
    // this._loadMoreButton.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderFilmsList() {
    if (this._filmsList.length === 0) {
      this._renderEmptyList();
      return;
    }
    this._renderFilmCards(0, Math.min(this._filmsList.length, this._renderedCards));
    if (this._filmsList.length > this._renderedCards) {
      this._renderLoadMoreButton();
    }
  }

  _renderTopRatedFilms(filmsList) {
    const TOP_FILMS = 2;
    const [topFilmsWrapper, ratedFilmsWrapper] = document.querySelectorAll(`.films-list--extra .films-list__container`);
    const topFilms = new MoviePresenter(topFilmsWrapper);
    const ratedFilms = new MoviePresenter(ratedFilmsWrapper);

    for (let i = 0; i < TOP_FILMS; i++) {
      render(topFilmsWrapper, topFilms.init(filmsList[i]));
    }

    for (let i = 0; i < TOP_FILMS; i++) {
      render(ratedFilmsWrapper, ratedFilms.init(filmsList[i]));
    }
  }
}

