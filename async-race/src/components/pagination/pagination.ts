class Pagination {
  public currentPage = 1;

  private numberOfItems: number = 0;

  private limitItemsPerPage: number;

  private elementOfCurrentPage: HTMLSpanElement;

  private numberOfPages: number = 0;

  private prevButton: HTMLButtonElement;

  private nextButton: HTMLButtonElement;

  private action: () => void;

  constructor(
    limitItemsPerPage: number,
    elementOfCurrentPage: HTMLSpanElement,
    prevButton: HTMLButtonElement,
    nextButton: HTMLButtonElement,
    action: () => void
  ) {
    this.limitItemsPerPage = limitItemsPerPage;
    this.elementOfCurrentPage = elementOfCurrentPage;
    this.prevButton = prevButton;
    this.nextButton = nextButton;
    this.elementOfCurrentPage.textContent = `${this.currentPage}`;
    this.action = action;
    this.addButtonHandler();
  }

  private addButtonHandler(): void {
    this.prevButton.addEventListener('click', () => this.prevPage());
    this.nextButton.addEventListener('click', () => this.nextPage());
  }

  private nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage += 1;
      this.elementOfCurrentPage.textContent = `${this.currentPage}`;
      this.checkDisabledButton();
      this.action();
    }
  }

  private prevPage(): void {
    if (this.currentPage - 1 > 0) {
      this.currentPage -= 1;
      this.elementOfCurrentPage.textContent = `${this.currentPage}`;
      this.checkDisabledButton();
      this.action();
    }
  }

  public setNumberOfItems(numberOfItems: number): void {
    this.numberOfItems = numberOfItems;
    this.numberOfPages = Math.ceil(this.numberOfItems / this.limitItemsPerPage);
    this.checkDisabledButton();
  }

  private checkDisabledButton(): void {
    if (this.currentPage - 1 === 0) {
      this.prevButton.disabled = true;
    } else {
      this.prevButton.disabled = false;
    }
    if (this.currentPage === this.numberOfPages) {
      this.nextButton.disabled = true;
    } else {
      this.nextButton.disabled = false;
    }
  }
}

export { Pagination };
