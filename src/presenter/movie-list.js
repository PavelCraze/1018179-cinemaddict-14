import Filter from "../view/filter";
import Sorting from "../view/sort";
import MoviePresenter from "./movie";
import ContentContainer from "../view/content-container";
import ListEmpty from "../view/list-empty";
import LoadMoreButton from "../view/show";
import {render, updateItem, remove, sortFilmsByDate, sortFilmsByRating} from "../util";
import {SortType} from '../const.js';

const CARDS_COUNT_PER_STEP = 5;

export default class MovieListPresenter {
  constructor(moviesContainer) {
    this._moviesContainer = moviesContainer;
    this._renderedCards = CARDS_COUNT_PER_STEP;
    this._filmCard = {};
    this._currentSortType = SortType.DEFAULT;

    this._contentContainer = new ContentContainer();
    this._listEmpty = new ListEmpty();
    this._loadMoreButton = new LoadMoreButton();
    this._sorting = new Sorting();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(filmsList) {
    this._filmsList = filmsList.slice();

    this._sourcedFilmsList = filmsList.slice();
    this._renderFilter(this._filmsList);
    this._renderSort();
    this._renderFilmsList(this._filmsList);
    this._renderTopRatedFilms(this._filmsList);
  }

  _handleModeChange() {
    Object
      .values(this._filmCard)
      .forEach((presenter) => presenter.resetView());
  }


  _renderFilter(filmsList) {
    this._filter = new Filter(filmsList);
    render(this._moviesContainer, this._filter);
  }

  _renderSort() {
    render(this._moviesContainer, this._sorting);
    this._sorting.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmCard(film) {
    const filmListElement = document.querySelector(`.films-list .films-list__container`);
    const filmCard = new MoviePresenter(filmListElement, this._handleFilmChange, this._handleModeChange);
    filmCard.init(film);
    this._filmCard[film.id] = filmCard;
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.RATING:
        this._filmsList.sort(sortFilmsByRating);
        break;
      case SortType.DATE:
        this._filmsList.sort(sortFilmsByDate);
        break;
      default:
        this._filmsList = this._sourcedFilmsList.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmsList();
    this._renderFilmsList();
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
    this._sourcedFilmsList = updateItem(this._sourcedFilmsList, updatedFilm);
    this._filmCard[updatedFilm.id].init(updatedFilm);
  }

  _handleLoadMoreButtonClick() {
    this._renderFilmCards(this._renderedCards, this._renderedCards + CARDS_COUNT_PER_STEP);
    this._renderedCards += CARDS_COUNT_PER_STEP;
    if (this._renderedCards >= this._filmsList.length) {
      remove(this._loadMoreButton);
    }
  }

  _renderLoadMoreButton() {
    const filmWrapper = document.querySelector(`.films-list`);
    render(filmWrapper, this._loadMoreButton);
    this._loadMoreButton.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _clearFilmsList() {
    Object
      .values(this._filmCard)
      .forEach((presenter) => presenter.destroy());
    this._filmCard = {};
    this._renderedCards = CARDS_COUNT_PER_STEP;
    remove(this._loadMoreButton);
  }

  _renderFilmsList() {
    if (this._filmsList.length === 0) {
      this._renderEmptyList();
      return;
    }
    render(this._moviesContainer, this._contentContainer);
    this._renderFilmCards(0, Math.min(this._filmsList.length, this._renderedCards));
    if (this._filmsList.length > this._renderedCards) {
      this._renderLoadMoreButton();
    }
  }

  _renderTopRatedFilms(filmsList) {
    const TOP_FILMS = 4;
    const [topFilmsWrapper, ratedFilmsWrapper] = document.querySelectorAll(`.films-list--extra .films-list__container`);
    const commentedFilms = new MoviePresenter(topFilmsWrapper, this._handleFilmChange, this._handleModeChange);
    const ratedFilms = new MoviePresenter(ratedFilmsWrapper, this._handleFilmChange, this._handleModeChange);

    for (let i = 0; i < TOP_FILMS; i++) {
      commentedFilms.init(filmsList[i]);
    }

    for (let i = 0; i < TOP_FILMS; i++) {
      ratedFilms.init(filmsList[i]);
    }
  }
}

