import paginationArrow from '../assets/pagination-arrow.svg';

const Pagination = () => {
  return (
    <div className='flex items-center justify-between mt-4 capitalize h-[2rem]'>
      <span>
        Data provided by{' '}
        <a href='https://www.coingecko.com/' rel='noreferrer' target='_blank' className='text-cyan'>
          CoinGecko
        </a>
      </span>
      <div className='flex items-center'>
        <ul className='flex items-center justify-end text-sm'>
          <li className='flex items-center'>
            <button className='outline-0
            hover:text-cyan w-8'>
              <img className='w-full h-auto rotate-180' src={paginationArrow} alt='right'/>
            </button>
          </li>
          <li>
            <button className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg'>
              ...
            </button>
          </li>
          <li>
            <button className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center
            bg-gray-200 mx-1.5'>
              1
            </button>
          </li>
          <li>
            <button className='outline-0 rounded-full w-8 h-8 flex items-center justify-center
            bg-cyan text-gray-300 mx-1.5'>
              2
            </button>
          </li>
          <li>
            <button className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center
            bg-gray-200 mx-1.5'>
              3
            </button>
          </li>
          <li>
            <button className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg'>
              ...
            </button>
          </li>
          <li>
            <button className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center
            bg-gray-200 mx-1.5'>
              100
            </button>
          </li>
          <li className='flex items-center'>
            <button className='outline-0
            hover:text-cyan w-8'>
              <img className='w-full h-auto' src={paginationArrow} alt='left'/>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Pagination;