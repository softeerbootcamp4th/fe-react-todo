export const BASE_URL = "http://localhost:3001";

export const fetchToDoList = async () => {
    try {
      const response = await fetch(`${BASE_URL}/todos`);
      if (!response.ok) {
        throw new Error('서버 오류 발생');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('데이터 불러오기 실패', error);
    }
};