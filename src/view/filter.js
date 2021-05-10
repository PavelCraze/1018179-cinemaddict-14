import {filters, cardFilters} from "../const";
import AbstractComponent from "./abstract-component";


const getNameFilter = (array, name) => {
  return array.filter((element) => {
    return element[name] === true;
  });
};

export default class Filter extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return (
      `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filters
          .map((name, index) => {
            return (
              `<a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${getNameFilter(this._films, cardFilters[index]).length}</span></a>`
            );
          })
          .join(`\n`)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
    );
  }
}
