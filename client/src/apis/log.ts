import { BadgeType } from '../components/badge/type';
import { baseURL } from './todo';

export interface ILog {
  id: number;
  content: string;
  type: BadgeType;
  oldContent: string;
}

// Create a new log entry
export async function createLogEntry(content: string, type: string, oldContent: string): Promise<ILog> {
  const response = await fetch(`${baseURL}/log`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, type, oldContent }),
  });

  if (!response.ok) {
    throw new Error(`Error creating log entry: ${response.statusText}`);
  }

  return response.json();
}

// Read all log entries
export async function getAllLogEntries(): Promise<ILog[]> {
  const response = await fetch(`${baseURL}/log`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error getting log entries: ${response.statusText}`);
  }

  return response.json();
}

// Read a single log entry by id
export async function getLogEntryById(id: number): Promise<ILog> {
  const response = await fetch(`${baseURL}/log/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error getting log entry with id ${id}: ${response.statusText}`);
  }

  return response.json();
}

// Update a log entry by id
export async function updateLogEntry(id: number, content: string, type: string, oldContent: string): Promise<ILog> {
  const response = await fetch(`${baseURL}/log/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, type, oldContent }),
  });

  if (!response.ok) {
    throw new Error(`Error updating log entry with id ${id}: ${response.statusText}`);
  }

  return response.json();
}

// Delete all log
export async function deleteAllLog(): Promise<ILog> {
  const response = await fetch(`${baseURL}/log`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error deleting log: ${response.statusText}`);
  }

  return response.json();
}

// Delete a log entry by id
export async function deleteLogEntry(id: number): Promise<ILog> {
  const response = await fetch(`${baseURL}/log/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error deleting log entry with id ${id}: ${response.statusText}`);
  }

  return response.json();
}
