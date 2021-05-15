import {isFilmWatchlist, isFilmHistory, isFilmFavorite} from "../util";

const filmToFilterMap = {
  all: (films) => films.length,
  watched: (films) => films
    .filter((film) => isFilmWatchlist(film)).length,
  today: (films) => films
    .filter((film) => isFilmHistory(film)).length,
  repeating: (films) => films
    .filter((film) => isFilmFavorite(film)).length,
  archive: (films) => films.filter((film) => film.isArchive).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};
