import { useState, ChangeEvent } from 'react';
import { handleSubmit } from '../../apis/fetch';

function SearchInput() {

  const [newItem, SetNewItem] = useState<string>('');

  const handleInputChange =(e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    SetNewItem(e.target.value);
  }

  const handleNewItem = () => {
    handleSubmit(newItem);
    SetNewItem('');  
  }
  return (
    <div className="justify-center items-center border-l-2 ml-2 w-[300px] flex-row p-2">
      <input type="text" 
        name="search input"
        value={newItem}
        onChange={handleInputChange}
        placeholder="할일을 입력하세요"
      />
      <button className=" bg-green-600 text-white ml-[10px]" onClick={handleNewItem}>등록</button>
    </div>
  )
}

export default SearchInput