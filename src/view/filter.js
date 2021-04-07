import {filters, cardFilters} from "../const";

const getNameFilter = (array, name) => {
  return array.filter((element) => {
    return element[name] === `true`;
  });
};

const createFilterMarkup = (filter, films) => {
  return filter
    .map((name, index) => {
      return (
        `<a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${getNameFilter(films, cardFilters[index]).length}</span></a>`
      );
    })
    .join(`\n`);
};

export const filterTemplate = (films) => {
  const filtersMarkup = createFilterMarkup(filters, films);
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filtersMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};
