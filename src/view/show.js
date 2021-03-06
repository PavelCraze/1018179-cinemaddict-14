import AbstractComponent from "./abstract-component.js";


export default class LoadMoreButton extends AbstractComponent {
  constructor() {
    super();
    this._element = null;
  }

  getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
