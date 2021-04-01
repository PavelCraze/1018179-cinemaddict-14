import {menu} from "./view/menu";
import {card} from "./view/card";
import {markup} from "./view/markup";
import {popup} from "./view/popup";
import {rank} from "./view/rank";
import {show} from "./view/show";


const NUMBER_OF_FILMS = 5;
const TOP_FILMS = 2;
const RATED_FILMS = 2;
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const render = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

render(headerElement, rank());
render(mainElement, menu());
render(mainElement, markup());

const cardWrapper = document.querySelector(`.films-list .films-list__container`);

for (let i = 0; i < NUMBER_OF_FILMS; i++) {
  render(cardWrapper, card());
}

const filmWrapper = document.querySelector(`.films-list`);

render(filmWrapper, show());

const [topFilmsWrapper, ratedFilmsWrapper] = document.querySelectorAll(`.films-list--extra .films-list__container`);

for (let i = 0; i < TOP_FILMS; i++) {
  render(topFilmsWrapper, card());
}

for (let i = 0; i < RATED_FILMS; i++) {
  render(ratedFilmsWrapper, card());
}

render(footerElement, popup());
