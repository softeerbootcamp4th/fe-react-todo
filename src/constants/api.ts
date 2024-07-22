const BASE_URL = 'http://dating.batro.org:4000/v1/todo';

export const enum API {
  TODOS = `${BASE_URL}/todos`,
  SORT_TODO = `${BASE_URL}/todos/sort`,
  TODO_HISTORIES = `${BASE_URL}/histories`,
}

export const API_HEADER = {
  headers: { 'Content-Type': 'application/json' },
};
