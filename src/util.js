import AbstractComponent from "../src/view/abstract-component";

export const isFilmWatchlist = (isWatchlist) => {
  return Object.values(isWatchlist).some(Boolean);
};

export const isFilmHistory = (isHistory) => {
  return Object.values(isHistory).some(Boolean);
};

export const isFilmFavorite = (isFavorite) => {
  return Object.values(isFavorite).some(Boolean);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, child) => {
  if (container instanceof AbstractComponent) {
    container = container.getElement();
  }

  if (child instanceof AbstractComponent) {
    child = child.getElement();
  }

  container.append(child);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractComponent)) {
    throw new Error(`Can remove only components`);
  }
  component.getElement().remove();
  component.removeElement();
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
