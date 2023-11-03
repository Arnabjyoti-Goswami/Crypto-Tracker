import { useContext, useState } from 'react';
import searchIcon from '../assets/search-icon.svg';
import { CryptoContext } from '../context/CryptoContext';
import debounce from 'lodash.debounce';
import { data } from 'autoprefixer';

const SearchInput = ({handleSearch}) => {
  const [searchText, setSearchText] = useState('');

  let { searchResultData } = useContext(CryptoContext);

  const handleInput = (e) => {
    e.preventDefault();
    let query = e.target.value;
    setSearchText(query);
    handleSearch(query);
  }

  console.log(searchResultData);

  return (
    <>
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

    {
      searchText.length > 0 ?
      <ul className='absolute top-11 right-0 w-full h-96 rounded 
      overflow-x-hidden py-2 bg-gray-200 bg-opacity-60
      backdrop-blur-md'>
      {
        searchResultData ? 
        searchResultData.coins.map(data => {
          return(
            <li>{data.id}</li>
          )
        })
        : <h2>please wait...</h2>
      }
      </ul>
      :
      null
    }
    </>
  )
}

const Search = () => {
  let { getSearchResult } = useContext(CryptoContext);

  const debounceFunc = debounce((val) => {
    getSearchResult(val);
  }, 2000)

  return (
    <SearchInput handleSearch={debounceFunc} />
  )
}

export default Search;