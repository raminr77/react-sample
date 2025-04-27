export const REQUEST_METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
} as const;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';
