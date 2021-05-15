import AbstractComponent from "./abstract-component.js";
import {SortType} from "../const.js";

export default class Sorting extends AbstractComponent {
  constructor() {
    super();
    this._element = null;

    this._callback = {};

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return (
      `<ul class="sort">
        <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
        <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
        <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
      </ul>`
    );
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    document.querySelectorAll(`.sort__button`).forEach((el) => el.classList.remove(`sort__button--active`));
    evt.target.classList.add(`sort__button--active`);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
