import { useContext } from 'react';
import selectIcon from '../assets/select-icon.svg';
import { CryptoContext } from '../context/CryptoContext.jsx';

const Sorting = () => {
  let { sortBy, setSortBy } = useContext(CryptoContext);

  const handleSort = (e) => {
    e.preventDefault();
    let val = e.target.value;
    e.target.placeholder = val;
    setSortBy(val);
  }

  const sortingOptions = [
    { val: 'market_cap_asc', label: 'market cap asc'},
    { val: 'market_cap_desc', label: 'market cap desc'},
    { val: 'volume_asc', label: 'volume asc'},
    { val: 'volume_desc', label: 'volume desc'},
    { val: 'id_asc', label: 'id asc'},
    { val: 'id_desc', label: 'id desc'},
  ];

  return (
    <label className='relative flex justify-center items-center'>
      <span className='font-bold mr-2'>sort by:</span>
      <select name="sortby"
      className='rounded bg-gray-200 text-base pl-2 pr-10 py-0.5 leading-4 capitalize
      focus:outline-0'
      value={sortBy}
      onChange={handleSort}
      >
      {
      sortingOptions.map( (item, index) => (
        <option value={item.val} key={`option ${index}`}>
          {item.label}
        </option>
      ) )
      }
      </select>
      <img src={selectIcon} alt='sort' className='w-[1rem] h-auto absolute right-1 top-2 pointer-events-none'/>
    </label>
  )
}

export default Sorting;