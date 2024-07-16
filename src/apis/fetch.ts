const BASE_URL = "http://localhost:3001";
import Todo from "../types/todoType";

export const fetchToDoList = () => {

  return fetch(`${BASE_URL}/todos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(responseData => {
      console.log('가져오기 성공', responseData);
      return responseData as Promise<Todo[]>;
    })
    .catch(error => {
      console.error('가져오기 실패', error);
      throw error;
    });
}

export const handleSubmit = (input: string) => {

  if (!input.trim()) {
    alert('할일을 입력하세요.');
    return;
  }

  fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: input, completed: false })
  })
    .then(response => response.json())
    .then(responseData => {
      console.log('추가 성공', responseData);
    })
    .catch(error => {
      console.error('추가 실패', error);
    });
}

export const handleDelete = (id: number) => {

  fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      console.log('삭제 완료');
    })
    .catch(error => {
      console.error('오류 발생', error);
    });
}

export const handleEdit = (id: number, todoItem: Partial<Todo>) => {
  return fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoItem),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('서버 에러 발생');
      }
      return response.json() as Promise<Todo[]>;
    })
    .then(updatedData => {
      console.log('수정 완료:', updatedData);
      return updatedData;
    })
    .catch(error => {
      console.error('수정 실패:', error);
      throw error; 
    });
}
