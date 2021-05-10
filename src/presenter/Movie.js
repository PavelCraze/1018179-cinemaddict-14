import FilmCard from "../view/film-card";
import Popup from "../view/popup";
import {render} from "../util";


export default class MoviePresenter {
  constructor(filmsListContainer, changeData) {
    this._filmsListContainer = filmsListContainer;
    this._changeData = changeData;

    this._filmCard = null;
    this._popup = null;

    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._filmCard = new FilmCard(film);
    this._popup = new Popup(film);

    this._filmCard.setClickHandler(this._handleCardClick);
    this._filmCard.setFavoriteButtonClickHandler = this._handleFavoriteClick.bind(this);
    this._filmCard.setWatchedButtonClickHandler = this._handleWatchedClick.bind(this);
    this._filmCard.setWatchlistButtonClickHandler = this._handleWatchlistClick.bind(this);
    this._popup.setCloseButtonClickHandler(this._handleCloseClick);
    this._popup.setFavoriteCheckboxClickHandler = this._handleFavoriteClick.bind(this);
    this._popup.setWatchedCheckboxClickHandler = this._handleWatchedClick.bind(this);
    this._popup.setWatchlistCheckboxClickHandler = this._handleWatchlistClick.bind(this);

    render(this._filmsListContainer, this._filmCard);
  }

  _replaceFilmCardToPopup(el) {
    render(document.body, el.getElement());
    document.body.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replacePopupToFilmCard(el) {
    document.body.removeChild(el.getElement());
    document.body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleCardClick() {
    this._replaceFilmCardToPopup(this._popup);
  }

  _handleCloseClick() {
    this._replacePopupToFilmCard(this._popup);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replacePopupToFilmCard(this._popup);
    }
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatchlist: !this._film.isWatchlist
            }
        )
    );
  }

}
