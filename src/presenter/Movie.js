import FilmCard from "../view/film-card";
import Popup from "../view/popup";
import {render, replace, remove} from "../util";

const Mode = {
  CARD: `CARD`,
  POPUP: `POPUP`,
};


export default class MoviePresenter {
  constructor(filmsListContainer, changeData, changeMode) {
    this._filmsListContainer = filmsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCard = null;
    this._popup = null;
    this._mode = Mode.CARD;

    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCard = this._filmCard;
    const prevPopup = this._popup;

    this._filmCard = new FilmCard(film);
    this._popup = new Popup(film);

    this._filmCard.setClickHandler(this._handleCardClick);
    this._filmCard.setFavoriteButtonClickHandler(this._handleFavoriteClick);
    this._filmCard.setWatchedButtonClickHandler(this._handleWatchedClick);
    this._filmCard.setWatchlistButtonClickHandler(this._handleWatchlistClick);

    if (prevFilmCard === null || prevPopup === null) {
      render(this._filmsListContainer, this._filmCard);
      return;
    }

    if (this._mode === Mode.CARD) {
      replace(this._filmCard, prevFilmCard);
    }

    if (this._mode === Mode.POPUP) {
      replace(this._popup, prevPopup);
      replace(this._filmCard, prevFilmCard);
    }

    remove(prevFilmCard);
    remove(prevPopup);
  }

  _replaceFilmCardToPopup() {
    render(document.body, this._popup);
    document.body.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._popup.setCloseButtonClickHandler(this._handleCloseClick);
    this._popup.setFavoriteCheckboxClickHandler(this._handleFavoriteClick);
    this._popup.setWatchedCheckboxClickHandler(this._handleWatchedClick);
    this._popup.setWatchlistCheckboxClickHandler(this._handleWatchlistClick);
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _replacePopupToFilmCard() {
    remove(this._popup);
    document.body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.CARD;
  }

  _handleCardClick() {
    this._replaceFilmCardToPopup();
  }

  _handleCloseClick() {
    this._replacePopupToFilmCard();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replacePopupToFilmCard();
    }
  }

  destroy() {
    remove(this._filmCard);
    remove(this._popup);
  }

  resetView() {
    if (this._mode !== Mode.CARD) {
      this._replacePopupToFilmCard();
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
              isHistory: !this._film.isHistory
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
