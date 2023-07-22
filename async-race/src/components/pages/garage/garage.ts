import { createElement } from '../../../helpers';
import { GARAGE_STYLE, GARAGE_TEXT } from './garage-const';
import './garage.css';

class Garage {
  private numberOfCars = 0;

  private createCarForm = this.createForm('create');

  private updateCarForm = this.createForm('update');

  private raceButton = createElement('button', GARAGE_STYLE.raceButton, GARAGE_TEXT.raceButton);

  private resetButton = createElement('button', GARAGE_STYLE.resetButton, GARAGE_TEXT.resetButton);

  private generateButton = createElement('button', GARAGE_STYLE.generateButton, GARAGE_TEXT.generateButton);

  private numberOfItems = createElement('span', GARAGE_STYLE.numberOfItems);

  private currentPage = createElement('span', GARAGE_STYLE.currentPage);

  private prevButton = createElement('button', GARAGE_STYLE.prevButton, GARAGE_TEXT.prevButton);

  private nextButton = createElement('button', GARAGE_STYLE.nextButton, GARAGE_TEXT.nextButton);

  private items = createElement('div', GARAGE_STYLE.items);

  constructor() {
    this.createGarage();
  }

  public createGarage(): HTMLElement {
    const garage = createElement('div', ['garage', 'page']);
    const buttons = createElement('div', GARAGE_STYLE.buttons);
    const title = createElement('h2', GARAGE_STYLE.title, GARAGE_TEXT.title);
    const pageNumber = createElement('h3', GARAGE_STYLE.pageNumber, GARAGE_TEXT.pageNumber);
    const paginationButtons = createElement('div', GARAGE_STYLE.paginationButtons);
    const updateCarId = createElement('span', GARAGE_STYLE.updateCarId);
    this.updateCarForm.append(updateCarId);
    this.resetButton.disabled = true;
    buttons.append(this.raceButton, this.resetButton, this.generateButton);
    title.append(this.numberOfItems);
    pageNumber.append(this.currentPage);
    paginationButtons.append(this.prevButton, this.nextButton);
    garage.append(this.createCarForm, this.updateCarForm, buttons, title, pageNumber, this.items, paginationButtons);
    return garage;
  }

  private createForm(formName: 'create' | 'update'): HTMLDivElement {
    const form = createElement('div', GARAGE_STYLE[`${formName}Car`]);
    const input = createElement('input', GARAGE_STYLE[`${formName}Input`]);
    const inputColor = createElement('input', GARAGE_STYLE[`${formName}InputColor`]);
    const button = createElement('button', GARAGE_STYLE[`${formName}Button`], GARAGE_TEXT[`${formName}Button`]);
    inputColor.type = 'color';
    form.append(input, inputColor, button);
    return form;
  }
}

export { Garage };
