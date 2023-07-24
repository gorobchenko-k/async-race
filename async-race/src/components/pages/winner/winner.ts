import { createElement, getElement, getElements } from '../../../helpers';
import { OrderParams } from '../../../types';
import { getCarImage } from '../../car/car-helpers';
import { Pagination } from '../../pagination/pagination';
import { getWinnersAPI } from './winner-api';
import './winner.css';
import { WINNER_STYLE, WINNER_TEXT, SORTABLE_COLUMNS, LIMIT_PER_PAGE } from './winnere-const';

class Winner {
  private numberOfWinners = 0;

  public winner = createElement('div', WINNER_STYLE.winner);

  private numberOfItems = createElement('span', WINNER_STYLE.numberOfItems);

  private currentPage = createElement('span', WINNER_STYLE.currentPage);

  private prevButton = createElement('button', WINNER_STYLE.prevButton, WINNER_TEXT.prevButton);

  private nextButton = createElement('button', WINNER_STYLE.nextButton, WINNER_TEXT.nextButton);

  private items = createElement('div', WINNER_STYLE.items);

  private tbody = createElement('tbody', []);

  private pagination = new Pagination(LIMIT_PER_PAGE, this.currentPage, this.prevButton, this.nextButton, () =>
    this.setWinnerContent()
  );

  constructor() {
    this.createWinner();
    this.setWinnerContent();
    this.addSortButtons();
    this.addButtonHandlers();
  }

  private createWinner(): void {
    const title = createElement('h2', WINNER_STYLE.title, WINNER_TEXT.title);
    const pageNumber = createElement('h3', WINNER_STYLE.pageNumber, WINNER_TEXT.pageNumber);
    const paginationButtons = createElement('div', WINNER_STYLE.paginationButtons);
    const table = createElement('table', WINNER_STYLE.table);
    const thead = createElement('thead', WINNER_STYLE.thead);
    const tr = createElement('tr', []);
    WINNER_TEXT.thead.forEach((titleOfColumn) => {
      const th = createElement(
        'th',
        ['winner__th', `th__${titleOfColumn.toLowerCase().replace(' ', '-')}`],
        titleOfColumn
      );
      tr.append(th);
    });
    title.append(this.numberOfItems);
    pageNumber.append(this.currentPage);
    thead.append(tr);
    table.append(thead, this.tbody);
    this.items.append(table);
    paginationButtons.append(this.prevButton, this.nextButton);
    this.winner.append(title, pageNumber, this.items, paginationButtons);
  }

  public setWinnerContent(sort = 'id', order: OrderParams = 'ASC'): void {
    getWinnersAPI(this.pagination.currentPage, LIMIT_PER_PAGE, sort, order).then(({ winners, numberOfWinners }) => {
      this.tbody.innerHTML = '';
      winners.forEach((winner, index) => {
        const tr = createElement('tr', []);
        const trContent = `<td>${index + 1}</td><td>${getCarImage(winner.car?.color)}</td><td>${winner.car
          ?.name}</td><td>${winner.wins}</td><td>${winner.time}</td>`;
        tr.innerHTML = trContent;
        this.tbody.append(tr);
      });
      this.setNumberOfWinners(numberOfWinners);
    });
  }

  private addSortButtons(): void {
    SORTABLE_COLUMNS.forEach((column) => {
      const titleOfColumn = column.toLowerCase().replace(' ', '-');
      const columnElement = getElement(`.th__${titleOfColumn}`, this.items);
      const div = createElement('div', []);
      const sortSpan = createElement('span', ['sort', `sort-${titleOfColumn}`]);
      const sortAscSpan = createElement('span', ['sort-asc']);
      const sortDescSpan = createElement('span', ['sort-desc']);
      columnElement.innerHTML = '';
      sortSpan.append(sortAscSpan, sortDescSpan);
      div.append(column, sortSpan);
      columnElement.append(div);
    });
  }

  private addButtonHandlers(): void {
    this.items.addEventListener('click', (e) => {
      const { target } = e;
      if (target && target instanceof HTMLElement) {
        const sortElement = target.closest<HTMLElement>('.sort');
        const titleOfColumn = sortElement?.classList[1].split('-').at(-1);
        getElements('.sort span').forEach((sortButton) => sortButton.classList.remove('active'));
        target.classList.add('active');
        if (sortElement && target.classList.contains('sort-asc')) this.setWinnerContent(titleOfColumn, 'ASC');
        if (sortElement && target.classList.contains('sort-desc')) this.setWinnerContent(titleOfColumn, 'DESC');
      }
    });
  }

  private setNumberOfWinners(numberOfWinners: number): void {
    this.numberOfWinners = numberOfWinners;
    this.numberOfItems.textContent = `(${this.numberOfWinners})`;
    this.pagination.setNumberOfItems(this.numberOfWinners);
  }
}

export { Winner };
