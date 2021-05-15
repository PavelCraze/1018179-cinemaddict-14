import AbstractComponent from "./abstract-component.js";


export default class LoadMoreButton extends AbstractComponent {
  constructor() {
    super();
    this._element = null;

    this._clickHandler = this._clickHandler.bind(this);
    this._callback = {};
  }

  getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
