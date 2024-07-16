import { useState, ChangeEvent } from 'react';
import { BASE_URL } from '../../apis/fetch';

function SearchInput() {

  const [newItem, SetNewItem] = useState<string>('');

  const handleInputChange =(e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    SetNewItem(e.target.value);
  }

  const handleSubmit = async () => {
    //공백 방지
    if (!newItem.trim()) {
      alert('할일을 입력하세요.');
      return;
    }

    try{
      const response = await fetch( `${BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: newItem, completed: false })
      });

      const responseData = await response.json();

      console.log('추가 성공', responseData);
      SetNewItem('');
    } catch(error){
      console.error('추가 실패', error);
    }
  }

  return (
    <div className="justify-center items-center border-l-2 ml-2 w-[300px] flex-row p-2">
      <input type="text" 
        name="search input"
        value={newItem}
        onChange={handleInputChange}
        placeholder="할일을 입력하세요"
      />
      <button className=" bg-green-600 text-white ml-[10px]" onClick={handleSubmit}>등록</button>
    </div>
  )
}

export default SearchInput