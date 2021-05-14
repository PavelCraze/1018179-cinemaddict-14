import Rank from "./view/rank";
import {generateFilmCards} from "./mock/film-data";
import {render} from "./util";
import MovieListPresenter from "./presenter/movie-list";

const NUMBER_OF_FILMS = 20;
const films = generateFilmCards(NUMBER_OF_FILMS);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const movieList = new MovieListPresenter(mainElement);

render(headerElement, new Rank());

movieList.init(films);
