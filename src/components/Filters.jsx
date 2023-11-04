import { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext.jsx';

import Search from './Search.jsx';
import Currency from './Currency.jsx';
import Sorting from './Sorting.jsx';
import ResetIcon from '../assets/ResetIcon.jsx';

const Filters = () => {
  let { resetHomePage } = useContext(CryptoContext);

  return (
    <div className='w-full h-12 border-2 border-gray-100 rounded-lg flex items-center justify-between relative'>
      <Search />
      <div className='flex mr-7'>
        <Currency />
        <Sorting />
        <button className='w-[2rem] ml-4
        hover:scale-110 transition-all transition-ease
        relative right-0 top-0'
        onClick={resetHomePage}>
          <ResetIcon />
        </button>
      </div>
    </div>
  )
}

export default Filters;