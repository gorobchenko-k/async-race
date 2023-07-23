import { carBrand, carModel } from '../../car/carName';

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function getRandomColor(): string {
  const r = getRandomInt(256);
  const g = getRandomInt(256);
  const b = getRandomInt(256);
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

function getRandomCarName(): string {
  const brandIndex = getRandomInt(carBrand.length);
  const modelIndex = getRandomInt(carModel.length);
  return `${carBrand[brandIndex]} ${carModel[modelIndex]}`;
}

export { getRandomColor, getRandomCarName };
