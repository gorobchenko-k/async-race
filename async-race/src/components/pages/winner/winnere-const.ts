const WINNER_STYLE = {
  winner: ['winner', 'page', 'hidden'], // , 'hidden'
  title: ['winner__title'],
  numberOfItems: ['winner__number-of-items'],
  pageNumber: ['winner__page-number'],
  currentPage: ['winner__current-page'],
  items: ['winner__items'],
  table: ['winner__table'],
  thead: ['winner__thead'],
  paginationButtons: ['winner__pagination-buttons'],
  prevButton: ['winner__button-prev', 'button'],
  nextButton: ['winner__button-next', 'button'],
};

const SORTABLE_COLUMNS = ['Wins', 'Best time'];

const WINNER_TEXT = {
  title: 'Winner',
  pageNumber: 'Page #',
  prevButton: '<',
  nextButton: '>',
  thead: ['Number', 'Car', 'Name', ...SORTABLE_COLUMNS],
};

const LIMIT_PER_PAGE = 10;

export { WINNER_STYLE, WINNER_TEXT, SORTABLE_COLUMNS, LIMIT_PER_PAGE };
