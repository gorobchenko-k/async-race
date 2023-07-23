import './garage.css';
import { createElement, getElement } from '../../../helpers';
import { GARAGE_STYLE, GARAGE_TEXT, LIMIT_PER_PAGE, NUMBER_OF_GENERETED_CARS } from './garage-const';
import { Pagination } from '../../pagination/pagination';
import { getCarAPI, getCarsAPI, createCarAPI, updateCarAPI, deleteCarAPI } from './garage-api';
import { Car } from '../../car/car';
import { getRandomCarName, getRandomColor } from './garage-helpers';

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

  private pagination = new Pagination(LIMIT_PER_PAGE, this.currentPage, this.prevButton, this.nextButton);

  constructor() {
    this.createGarage();
    this.setGarageContent();
    this.addButtonHandlers();
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

  private setGarageContent(): void {
    getCarsAPI(this.pagination.currentPage, LIMIT_PER_PAGE).then(({ cars, numberOfCars }) => {
      this.items.innerHTML = '';
      cars.forEach((carData) => {
        const car = new Car(carData.id, carData.name, carData.color);
        this.items.append(car.element);
      });
      this.setNumberOfCars(numberOfCars);
    });
  }

  private addButtonHandlers(): void {
    const createButton = getElement(`.${GARAGE_STYLE.createButton[0]}`, this.createCarForm);
    const updateButton = getElement(`.${GARAGE_STYLE.updateButton[0]}`, this.updateCarForm);
    createButton.addEventListener('click', () => this.createCar());
    updateButton.addEventListener('click', () => this.updateCar());
    this.generateButton.addEventListener('click', () => this.generateCar());
    this.prevButton.addEventListener('click', () => this.setGarageContent());
    this.nextButton.addEventListener('click', () => this.setGarageContent());
    this.items.addEventListener('click', (e) => {
      const { target } = e;
      if (target && target instanceof HTMLElement) {
        const carElement = target.closest<HTMLElement>('.car');
        if (carElement && target.classList.contains('car__select')) this.selectCar(carElement);
        if (carElement && target.classList.contains('car__remove')) this.deleteCar(carElement);
      }
    });
  }

  private createCar(): void {
    const inputName = getElement<HTMLInputElement>(`.${GARAGE_STYLE.createInput}`, this.createCarForm);
    const inputColor = getElement<HTMLInputElement>(`.${GARAGE_STYLE.createInputColor}`, this.createCarForm);
    if (inputName.value) {
      createCarAPI({
        name: inputName.value,
        color: inputColor.value,
      }).then(() => {
        this.setGarageContent();
        this.setNumberOfCars(this.numberOfCars + 1);
        inputName.value = '';
        inputColor.value = '#000000';
      });
    } else {
      this.createCarForm.append('Enter the name of the car');
    }
  }

  private selectCar(carElement: Element): void {
    const carId = carElement.getAttribute('carid');
    if (!carId) throw new Error('carId is null');

    getCarAPI(carId).then((carData) => {
      const inputName = getElement<HTMLInputElement>(`.${GARAGE_STYLE.updateInput}`, this.updateCarForm);
      const inputColor = getElement<HTMLInputElement>(`.${GARAGE_STYLE.updateInputColor}`, this.updateCarForm);
      inputName.value = carData.name;
      inputColor.value = carData.color;
      getElement(`.${GARAGE_STYLE.updateCarId}`).textContent = carId;
    });
  }

  private updateCar(): void {
    const carId = getElement(`.${GARAGE_STYLE.updateCarId}`, this.updateCarForm).textContent;
    const inputName = getElement<HTMLInputElement>(`.${GARAGE_STYLE.updateInput}`, this.updateCarForm);
    const inputColor = getElement<HTMLInputElement>(`.${GARAGE_STYLE.updateInputColor}`, this.updateCarForm);
    if (!carId) throw new Error('carId is null');

    if (inputName.value) {
      updateCarAPI(carId, {
        name: inputName.value,
        color: inputColor.value,
      }).then((carData) => {
        const carElement = getElement(`.car[carid="${carData.id}"]`, this.items);
        const name = getElement('.car__name', carElement);
        const image = getElement('.car__image svg', carElement);
        name.textContent = carData.name;
        image.style.fill = carData.color;
        inputName.value = '';
        inputColor.value = '#000000';
      });
    } else {
      this.updateCarForm.append('Enter the name of the car');
    }
  }

  private deleteCar(carElement: Element): void {
    const carId = carElement.getAttribute('carid');
    if (!carId) throw new Error('carId is null');

    deleteCarAPI(carId).then(() => {
      carElement.remove();
      this.setNumberOfCars(this.numberOfCars - 1);
    });
  }

  private generateCar(): void {
    for (let i = 0; i < NUMBER_OF_GENERETED_CARS; i += 1) {
      const name = getRandomCarName();
      const color = getRandomColor();
      createCarAPI({ name, color });
    }
    this.setGarageContent();
  }

  private setNumberOfCars(numberOfCars: number): void {
    this.numberOfCars = numberOfCars;
    this.numberOfItems.textContent = `(${this.numberOfCars})`;
    this.pagination.setNumberOfItems(this.numberOfCars);
  }
}

export { Garage };
