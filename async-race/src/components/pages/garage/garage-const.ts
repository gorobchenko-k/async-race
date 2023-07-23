const GARAGE_STYLE = {
  createCar: ['garage__create-car', 'form'],
  createInput: ['garage__input-create'],
  createInputColor: ['garage__input-color-create'],
  createButton: ['garage__button-create', 'button'],
  updateCar: ['garage__update-car', 'form'],
  updateInput: ['garage__input-update'],
  updateInputColor: ['garage__input-color-update'],
  updateButton: ['garage__button-update', 'button'],
  updateCarId: ['garage__update-car-id'],
  buttons: ['buttons'],
  raceButton: ['garage__button-race', 'button'],
  resetButton: ['garage__button-reset', 'button'],
  generateButton: ['garage__button-generate', 'button'],
  title: ['garage__title'],
  numberOfItems: ['garage__number-of-items'],
  pageNumber: ['garage__page-number'],
  currentPage: ['garage__current-page'],
  items: ['garage__items'],
  paginationButtons: ['garage__pagination-buttons'],
  prevButton: ['garage__button-prev', 'button'],
  nextButton: ['garage__button-next', 'button'],
};

const GARAGE_TEXT = {
  createButton: 'Create',
  updateButton: 'Update',
  raceButton: 'Race',
  resetButton: 'Reset',
  generateButton: 'Generate cars',
  title: 'Garage',
  pageNumber: 'Page #',
  prevButton: '<',
  nextButton: '>',
};

const LIMIT_PER_PAGE = 7;

const NUMBER_OF_GENERETED_CARS = 100;

export { GARAGE_STYLE, GARAGE_TEXT, LIMIT_PER_PAGE, NUMBER_OF_GENERETED_CARS };
