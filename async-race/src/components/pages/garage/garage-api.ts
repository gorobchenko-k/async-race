import { CarResponse } from '../../../types';

const BASE_LINK = 'http://127.0.0.1:3000';

async function getCarsAPI(
  numberOfPage: number,
  limit: number
): Promise<{ cars: CarResponse[]; numberOfCars: number }> {
  const response = await fetch(`${BASE_LINK}/garage?_page=${numberOfPage}&_limit=${limit}`, {
    method: 'GET',
  });
  return {
    cars: await response.json(),
    numberOfCars: Number(response.headers.get('X-Total-count')),
  };
}

export { getCarsAPI };
