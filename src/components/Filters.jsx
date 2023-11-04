import Search from './Search.jsx';
import Currency from './Currency.jsx';
import Sorting from './Sorting.jsx';

const Filters = () => {
  return (
    <div className='w-full h-12 border-2 border-gray-100 rounded-lg flex items-center justify-between relative'>
      <Search />
      <div className='flex mr-7'>
        <Currency />
        <Sorting />
      </div>
    </div>
  )
}

export default Filters;