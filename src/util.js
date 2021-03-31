const render = (element, itemView) => {
  const newFragment = document.createDocumentFragment();
  const newElement = itemView;
  newFragment.appendChild(newElement);
  element.appendChild(newFragment);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

export {render, createElement};
