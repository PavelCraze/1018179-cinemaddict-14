import {emojies} from "../const";
import AbstractComponent from "./abstract-component";

export default class Popup extends AbstractComponent {
  constructor({poster, title, age, director, writers, actors, rating, date, duration, country, genreNames, description, comments, id}) {
    super();
    this._element = null;
    this._poster = poster;
    this._title = title;
    this._age = age;
    this._director = director;
    this._writers = writers;
    this._actors = actors;
    this._rating = rating;
    this._date = date;
    this._duration = duration;
    this._country = country;
    this._genreNames = genreNames;
    this._description = description;
    this._comments = comments;
    this._id = id;
    this._callback = {};

    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._favoriteCheckboxClickHandler = this._closeButtonClickHandler.bind(this);
    this._watchedCheckboxClickHandler = this._closeButtonClickHandler.bind(this);
    this._watchlistCheckboxClickHandler = this._closeButtonClickHandler.bind(this);
  }

  getTemplate() {
    return (
      `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${this._poster}" alt="${this._title}">
            <p class="film-details__age">${this._age}+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">Original: ${this._title}</p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._rating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${this._director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${this._writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${this._actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${this._date.getDate()} ${this._date.getMonth()} ${this._date.getFullYear()}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${this._duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${this._country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${this._genreNames.length > 1 ? `Genres` : `Genre`}</td>
                <td class="film-details__cell">
                  ${this._genreNames
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
             ${this._description}
            </p>
          </div>
        </div>
        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>
      <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>
      <ul class="film-details__comments-list">
        ${this._comments
          .map((comment) => {
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
    </section>`
    );
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

  _favoriteCheckboxClickHandler() {
    this._handler.clickFavorite(this._data.id);
  }

  _watchedCheckboxClickHandler() {
    this._callback.clickWatched(this._data.id);
  }

  _watchlistCheckboxClickHandler() {
    this._callback.clickWatchlist(this._data.id);
  }

  setFavoriteCheckboxClickHandler(callback) {
    this._callback.clickFavorite = callback;

    this.getElement()
      .querySelector(`#favorite`)
      .addEventListener(`click`, this._favoriteCheckboxClickHandler);
  }

  setWatchedCheckboxClickHandler(handler) {
    this._handler.clickWatched = handler;

    this.getElement()
      .querySelector(`#watched`)
      .addEventListener(`click`, this._watchedCheckboxClickHandler);
  }

  setWatchlistCheckboxClickHandler(handler) {
    this._handler.clickWatchlist = handler;

    this.getElement()
      .querySelector(`#watchlist`)
      .addEventListener(`click`, this._watchlistCheckboxClickHandler);
  }
}

