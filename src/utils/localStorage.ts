/* eslint-disable @typescript-eslint/no-explicit-any */

export const StorageKeys = Object.freeze({
  recentTodo: 'recent_todo',
});

export function getLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key) ?? '');
}

export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
