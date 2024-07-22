export const baseURL = 'http://localhost:3000';

export interface ITodoItem {
  id: number;
  content: string;
  isEnd: boolean;
}

// Read all recent search items
export async function getRecentSearchItems(): Promise<string[]> {
  const response = await fetch(`${baseURL}/recent-search`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error getting todo items: ${response.statusText}`);
  }

  return response.json();
}

// Create a new todo item
export async function createTodoItem(content: string, isEnd: boolean): Promise<ITodoItem> {
  const response = await fetch(`${baseURL}/todo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, isEnd }),
  });

  if (!response.ok) {
    throw new Error(`Error creating todo item: ${response.statusText}`);
  }

  return response.json();
}

// Read all todo items
export async function getAllTodoItems(): Promise<ITodoItem[]> {
  const response = await fetch(`${baseURL}/todo`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error getting todo items: ${response.statusText}`);
  }

  return response.json();
}

// Read a single todo item by id
export async function getTodoItemById(id: number): Promise<ITodoItem> {
  const response = await fetch(`${baseURL}/todo/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error getting todo item with id ${id}: ${response.statusText}`);
  }

  return response.json();
}

export async function updateTodoItemIsEnd(id: number, isEnd: boolean): Promise<ITodoItem> {
  const response = await fetch(`${baseURL}/todo/done/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isEnd }),
  });

  if (!response.ok) {
    throw new Error(`Error updating todo item with id ${id}: ${response.statusText}`);
  }

  return response.json();
}

// Update a todo item by id
export async function updateTodoItem(id: number, content: string, isEnd: boolean): Promise<ITodoItem> {
  const response = await fetch(`${baseURL}/todo/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, isEnd }),
  });

  if (!response.ok) {
    throw new Error(`Error updating todo item with id ${id}: ${response.statusText}`);
  }

  return response.json();
}

// 새로운 todoItems 배열을 서버에 보내어 전체 데이터를 교체하는 함수
export async function replaceTodoItems(newTodoItems: ITodoItem[]): Promise<ITodoItem[]> {
  try {
    const response = await fetch(`${baseURL}/todo`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newTodoItems }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error replacing todo items:', error);
    throw error;
  }
}

// Delete a todo item by id
export async function deleteTodoItem(id: number): Promise<ITodoItem> {
  const response = await fetch(`${baseURL}/todo/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error deleting todo item with id ${id}: ${response.statusText}`);
  }

  return response.json();
}
