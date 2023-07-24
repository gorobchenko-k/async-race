type CarResponse = {
  name: string;
  color: string;
  id: number;
};

type CarData = {
  name: string;
  color: string;
};

type EngineResponse = {
  velocity: number;
  distance: number;
};

type WinnerResponse = {
  id?: number;
  wins: number;
  time: number;
};

type WinnersResponse = WinnerResponse & {
  car: CarResponse;
};

type OrderParams = 'ASC' | 'DESC';

export { CarResponse, CarData, EngineResponse, WinnerResponse, WinnersResponse, OrderParams };
