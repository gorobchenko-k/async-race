import { WinnerResponse } from '../../../types';

const BASE_LINK = 'http://127.0.0.1:3000';

async function getWinnerAPI(id: string): Promise<WinnerResponse | null> {
  const response = await fetch(`${BASE_LINK}/winners/${id}`, { method: 'GET' });
  return response.status === 200 ? response.json() : null;
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

export { getWinnerAPI, createWinnerAPI, updateWinnerAPI };
