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

export { CarResponse, CarData, EngineResponse, WinnerResponse };
