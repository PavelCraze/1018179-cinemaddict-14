import {emojies} from "../const";
import Smart from "./smart";

const createPopupTemplate = (movie) => {
  const {
    poster,
    title,
    age,
    rating,
    director,
    writers,
    actors,
    date,
    duration,
    country,
    genreNames,
    description,
    isWatchlist,
    isHistory,
    isFavorite,
    comments
  } = movie;

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${title}">
          <p class="film-details__age">${age}+</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${title}</p>
            </div>
            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${date.getDate()} ${date.getMonth()} ${date.getFullYear()}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genreNames.length > 1 ? `Genres` : `Genre`}</td>
              <td class="film-details__cell">
                ${genreNames
                  .map((genre) => {
                    return (
                      `<span class="film-details__genre">${genre}</span>`
                    );
                  })
                  .join(`\n`)}
               </td>
            </tr>
          </table>
          <p class="film-details__film-description">
           ${description}
          </p>
        </div>
      </div>
      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" ${isWatchlist ? `checked` : ``} id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
        <input type="checkbox" class="film-details__control-input visually-hidden" ${isHistory ? `checked` : ``} id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
        <input type="checkbox" class="film-details__control-input visually-hidden" ${isFavorite ? `checked` : ``} id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>
    <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
    <ul class="film-details__comments-list">
      ${comments
        // костыль
        .filter((comment)=> comment !== undefined).map((comment) => {
          return (
            `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-${comment.emoji}">
              </span>
              <div>
                <p class="film-details__comment-text">${comment.text}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${comment.author}</span>
                  <span class="film-details__comment-day">${comment.day}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>`
          );
        })
        .join(`\n`)}
    </ul>
    <div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label"></div>
      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>
      <div class="film-details__emoji-list">
        ${emojies
          .map((emoji) => {
            return (
              `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
                <label class="film-details__emoji-label" for="emoji-${emoji}">
                  <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
                </label>`
            );
          })
          .join(`\n`)}
      </div>
    </div>
  </section>
    </div>
  </form>
  </section>`;
};

export default class Popup extends Smart {
  constructor(movie) {
    super();

    this._data = Popup.parseFilmToData(movie);
    this._element = null;

    this._callback = {};

    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._favoriteCheckboxClickHandler = this._favoriteCheckboxClickHandler.bind(this);
    this._watchedCheckboxClickHandler = this._watchedCheckboxClickHandler.bind(this);
    this._watchlistCheckboxClickHandler = this._watchlistCheckboxClickHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._data);
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setCloseButtonClickHandler(callback) {
    this._callback.click = callback;

    this.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._closeButtonClickHandler);
  }

  addEmojiHandler() {
    this.getElement().querySelectorAll(`.film-details__emoji-label`).forEach((el) => {
      console.log(el);
      el.addEventListener(`click`, () =>{
        console.log('1');
      });
    });
  }

  _emojiClickHandler(emoji) {
    if (emoji.checked) {
      const emojiImage = `<img src="images/${emoji.value}/smile.png" width="55" height="55" alt="emoji-smile">`;
      this.getElement()
      .querySelector(`.film-details__add-emoji-label`)
      .innerHTML(emojiImage);
    }
  }

  _favoriteCheckboxClickHandler() {
    // this.updateData({
    //   isFavorite: !this._data.isFavorite,
    // });
    this._callback.clickFavorite(this._data.id);
  }

  _watchedCheckboxClickHandler() {
    this._callback.clickWatched(this._data.id);
  //   this.updateData({
  //     isHistory: !this._data.isHistory,
  //   });
  }

  _watchlistCheckboxClickHandler() {
    this._callback.clickWatchlist(this._data.id);
    // this.updateData({
    //   isWatchlist: !this._data.isWatchlist,
    // });
  }

  setFavoriteCheckboxClickHandler(callback) {
    this._callback.clickFavorite = callback;

    this.getElement()
      .querySelector(`#favorite`)
      .addEventListener(`click`, this._favoriteCheckboxClickHandler);
  }

  setWatchedCheckboxClickHandler(callback) {
    this._callback.clickWatched = callback;

    this.getElement()
      .querySelector(`#watched`)
      .addEventListener(`click`, this._watchedCheckboxClickHandler);
  }

  setWatchlistCheckboxClickHandler(callback) {
    this._callback.clickWatchlist = callback;

    this.getElement()
      .querySelector(`#watchlist`)
      .addEventListener(`click`, this._watchlistCheckboxClickHandler);
  }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film,
        {
          isFavorite: film.isFavorite,
          isWatchlist: film.isWatchlist,
          isHistory: film.isHistory,
        }
    );
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      comment: evt.target.value,
    }, true);
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    return data;
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`#watched`)
      .addEventListener(`click`, this._watchedCheckboxClickHandler);
    this.getElement()
      .querySelector(`#watchlist`)
      .addEventListener(`click`, this._watchlistCheckboxClickHandler);
    this.getElement()
      .querySelector(`#favorite`)
      .addEventListener(`click`, this._favoriteCheckboxClickHandler);
    this.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._closeButtonClickHandler);
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._commentInputHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }
}

