import { useState } from 'react';
import searchIcon from '../assets/search-icon.svg';

const Search = () => {
  const [searchText, setSearchText] = useState('');

  const handleInput = (e) => {
    e.preventDefault();
    let query = e.target.value;
    setSearchText(query);
  }

  return (
    <form className='w-96 relative flex items-center ml-7 font-nunito'>
      <input type='text' name='search' placeholder='search here...' 
      className='w-full rounded bg-gray-200
      placeholder:text-gray-100 pl-2
      required outline-0 border border-transparent
      focus:border-cyan'
      onChange={handleInput}
      value={searchText} />
      <button type='submit' className='absolute right-1 cursor-pointer'>
        <img src={searchIcon} alt='search' className='w-full h-auto' />
      </button>
    </form>
  )
}

export default Search;