
import {menu} from "./view/menu";
import {card} from "./view/card";
import {markup} from "./view/markup";
import {popup} from "./view/popup";
import {rank} from "./view/rank";
import {show} from "./view/show";


const NUMBER_OF_FILMS = 5;
const TOP_FILMS = 2;
const RATED_FILMS = 2;
const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const basementSite = document.querySelector(`.footer`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeader, rank(), `beforeend`);
render(siteMain, menu(), `beforeend`);
render(siteMain, markup(), `beforeend`);

const cardWrapper = document.querySelector(`.films-list .films-list__container`);

for (let i = 0; i < NUMBER_OF_FILMS; i++) {
  render(cardWrapper, card(), `afterbegin`);
}

const filmWrapper = document.querySelector(`.films-list`);

render(filmWrapper, show(), `beforeend`);

const cardTopRatedWrappers = document.querySelectorAll(`.films-list--extra .films-list__container`);

for (let i = 0; i < TOP_FILMS; i++) {
  render(cardTopRatedWrappers[0], card(), `beforeend`);
}

for (let i = 0; i < RATED_FILMS; i++) {
  render(cardTopRatedWrappers[1], card(), `beforeend`);
}

render(basementSite, popup(), `afterend`);
