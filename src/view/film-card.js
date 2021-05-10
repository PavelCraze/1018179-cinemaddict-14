import AbstractComponent from "./abstract-component.js";
// import {isWatchlist, isHistory, isFavorite} from '../util.js';

const CLASS_NAMES_BLACK_LIST = [`film-card__poster`, `film-card__title`, `film-card__comments`];
const isBlackListClassName = (className) => CLASS_NAMES_BLACK_LIST.includes(className);

export default class FilmCard extends AbstractComponent {

  constructor({title, rating, date, duration, genreNames, poster, description, comments, isWatchlist, isFavorite, isHistory, id}) {
    super();
    this._element = null;
    this._title = title;
    this._rating = rating;
    this._date = date;
    this._duration = duration;
    this._genreNames = genreNames;
    this._poster = poster;
    this._description = description;
    this._id = id;
    this._comments = comments;
    this._isWatchlist = isWatchlist;
    this._isHistory = isHistory;
    this._isFavorite = isFavorite;


    this._callback = {};

    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteButtonClickHandler = this._favoriteButtonClickHandler.bind(this);
    this._watchedButtonClickHandler = this._watchedButtonClickHandler.bind(this);
    this._watchlistButtonClickHandler = this._watchlistButtonClickHandler.bind(this);

  }

  getTemplate() {
    return (
      `<article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
      <span class="film-card__year">${this._date.getFullYear()}</span>
        <span class="film-card__duration">${this._duration}</span>
        <span class="film-card__genre">${this._genreNames[0]}</span>
      </p>
      <img src="./images/posters/${this._poster}" alt="${this._title}" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <a class="film-card__comments">${this._comments.length} comments</a>
      <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isWatchlist ? `film-card__controls-item--active` : ``}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isHistory ? `film-card__controls-item--active` : ``}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isFavorite ? `film-card__controls-item--active` : ``}" type="button">Mark as favorite</button>
      </form>
  </article>`);
  }

  _clickHandler(evt) {
    if (!isBlackListClassName(evt.target.className)) {
      return;
    }

    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement()
      .addEventListener(`click`, this._clickHandler);
  }

  _favoriteButtonClickHandler(evt) {
    evt.preventDefault();

    this._callback.clickFavorite(this._id);
  }

  _watchedButtonClickHandler(evt) {
    evt.preventDefault();

    this._callback.clickWatched(this._id);
  }

  _watchlistButtonClickHandler(evt) {
    evt.preventDefault();

    this._callback.clickWatchlist(this._id);
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement()
      .addEventListener(`click`, this._clickHandler);
  }

  setFavoriteButtonClickHandler(callback) {
    this._callback.clickFavorite = callback;

    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._favoriteButtonClickHandler);
  }

  setWatchedButtonClickHandler(callback) {
    this._callback.clickWatched = callback;

    this.getElement()
      .querySelector(`.film-card__controls-item--watched`)
      .addEventListener(`click`, this._watchedButtonClickHandler);
  }

  setWatchlistButtonClickHandler(callback) {
    this._callback.clickWatchlist = callback;

    this.getElement()
      .querySelector(`.film-card__controls-item--watchlist`)
      .addEventListener(`click`, this._watchlistButtonClickHandler);
  }
}

