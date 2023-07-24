import { OrderParams, WinnerResponse, WinnersResponse } from '../../../types';
import { getCarAPI } from '../garage/garage-api';

const BASE_LINK = 'http://127.0.0.1:3000';

async function getWinnerAPI(id: string): Promise<WinnerResponse | null> {
  const response = await fetch(`${BASE_LINK}/winners/${id}`, { method: 'GET' });
  return response.status === 200 ? response.json() : null;
}

async function getWinnersAPI(
  numberOfPage: number,
  limit: number,
  sort: string,
  order: OrderParams
): Promise<{ winners: WinnersResponse[]; numberOfWinners: number }> {
  const response = await fetch(
    `${BASE_LINK}/winners?_page=${numberOfPage}&_limit=${limit}&_sort=${sort}&_order=${order}`,
    { method: 'GET' }
  );
  const items = await response.json();
  return {
    winners: await Promise.all(
      items.map(async (winner: { id: number }) => ({ ...winner, car: await getCarAPI(`${winner.id}`) }))
    ),
    numberOfWinners: Number(response.headers.get('X-Total-count')),
  };
}

async function createWinnerAPI(dataParams: WinnerResponse): Promise<WinnerResponse> {
  const response = await fetch(`${BASE_LINK}/winners`, {
    method: 'POST',
    body: JSON.stringify(dataParams),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

async function updateWinnerAPI(id: string, dataParams: WinnerResponse): Promise<WinnerResponse> {
  const response = await fetch(`${BASE_LINK}/winners/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dataParams),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

async function deleteWinnerAPI(id: string): Promise<void> {
  await fetch(`${BASE_LINK}/winners/${id}`, {
    method: 'DELETE',
  });
}

export { getWinnerAPI, getWinnersAPI, createWinnerAPI, updateWinnerAPI, deleteWinnerAPI };
