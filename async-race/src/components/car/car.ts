import './car.css';
import { createElement } from '../../helpers';
import { getCarImage } from './car-helpers';

const CAR_STYLE = {
  car: ['garage__car', 'car'],
  header: ['car__header'],
  selectButton: ['car__select', 'button'],
  removeButton: ['car__remove', 'button'],
  name: ['car__name'],
  road: ['car__road'],
  buttons: ['car__buttons'],
  startButton: ['car__start', 'button'],
  stopButton: ['car__stop', 'button'],
  image: ['car__image'],
  flag: ['car__flag'],
};

const CAR_TEXT = {
  selectButton: 'Select',
  removeButton: 'Remove',
  startButton: 'A',
  stopButton: 'B',
};

const FLAG_SVG = `<svg xmlns="http://www.w3.org/2000/svg"  width="2vw" fill="#ff0000" viewBox="0 0 448 512"> <path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z" /> </svg>`;

class Car {
  public element: HTMLElement;

  constructor(id: number, name: string, color: string) {
    this.element = this.createCar(id, name, color);
  }

  private createCar(id: number, name: string, color: string): HTMLElement {
    const car = createElement('div', CAR_STYLE.car);
    const header = createElement('div', CAR_STYLE.header);
    const selectButton = createElement('button', CAR_STYLE.selectButton, CAR_TEXT.selectButton);
    const removeButton = createElement('button', CAR_STYLE.removeButton, CAR_TEXT.removeButton);
    const carName = createElement('h4', CAR_STYLE.name, name);
    const road = createElement('div', CAR_STYLE.road);
    const buttons = createElement('div', CAR_STYLE.buttons);
    const startButton = createElement('button', CAR_STYLE.startButton, CAR_TEXT.startButton);
    const stopButton = createElement('button', CAR_STYLE.stopButton, CAR_TEXT.stopButton);
    const image = createElement('div', CAR_STYLE.image);
    const flag = createElement('div', CAR_STYLE.flag);

    car.setAttribute('carId', id.toString());

    stopButton.disabled = true;

    image.innerHTML = getCarImage(color);
    flag.innerHTML = FLAG_SVG;

    header.append(selectButton, removeButton, carName);
    buttons.append(startButton, stopButton);
    road.append(buttons, image, flag);
    car.append(header, road);

    return car;
  }
}

export { Car };
