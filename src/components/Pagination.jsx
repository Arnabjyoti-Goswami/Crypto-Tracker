import { useContext } from 'react';
import paginationArrow from '../assets/pagination-arrow.svg';
import { CryptoContext } from '../context/CryptoContext.jsx';
import PerPage from './PerPage.jsx';

const Pagination = () => {
  let { currentPage, setCurrentPage, totalCoins, coinsPerPage } = useContext(CryptoContext);

  let totalPages = Math.ceil(totalCoins / coinsPerPage);

  const nextPage = () => {
    if(currentPage === totalPages) {
      return null;
    } else {
      setCurrentPage(currentPage + 1);
    }
  }

  const prevPage = () => {
    if(currentPage === 1) {
      return null;
    } else {
      setCurrentPage(currentPage - 1);
    }
  }

  const multiStepNext = () => {
    if(currentPage + 3 >= totalPages) {
      setCurrentPage(totalPages - 1);
    } else {
      setCurrentPage(currentPage + 3);
    }
  }

  const multiStepPrev = () => {
    if(currentPage - 3 <= 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 2);
    }
  }

  return (
    <div className='flex items-center justify-between mt-4 capitalize h-[2rem]'>
      <span>
        Data provided by{' '}
        <a href='https://www.coingecko.com/' rel='noreferrer' target='_blank' className='text-cyan'>
          CoinGecko
        </a>
      </span>

      <div className='flex items-center'>
        <PerPage />
        <ul className='flex items-center justify-end text-sm'>
          {
          currentPage !== 1 
          ? (
          <>
          <li className='flex items-center'>
            <button className='outline-0
            hover:text-cyan w-8'
            onClick={prevPage}>
              <img className='w-full h-auto rotate-180' src={paginationArrow} alt='left'/>
            </button>
          </li>
          <li>
            <button className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center
            bg-gray-200 mx-1.5'
            onClick={ () => {
              setCurrentPage(1);
            } }>
              1
            </button>
          </li>
          </>
          ) :
          null
          }
          {
          currentPage !== 1 && currentPage - 1 !== 1
          ? (
          <>
          <li>
            <button className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg'
            onClick={multiStepPrev}>
              ...
            </button>
          </li>
          <li>
            <button className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center
            bg-gray-200 mx-1.5'
            onClick={prevPage}>
              {currentPage - 1}
            </button>
          </li>
          </>
          ) :
          null
          }
          <li>
            <button className='outline-0 rounded-full w-8 h-8 flex items-center justify-center
            bg-cyan text-gray-300 mx-1.5'>
              {currentPage}
            </button>
          </li>
          {
          currentPage + 1 !== totalPages && currentPage !== totalPages
          ? (
          <>
          <li>
            <button className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center
            bg-gray-200 mx-1.5'
            onClick={nextPage}>
              {currentPage + 1}
            </button>
          </li>
          <li>
            <button className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg'
            onClick={multiStepNext}>
              ...
            </button>
          </li>
          </>
          ) :
          null
          }
          {
          currentPage !== totalPages
          ? (
          <>
          <li>
            <button className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center
            bg-gray-200 mx-1.5'
            onClick={ () => {
              setCurrentPage(totalPages);
            } }>
              {totalPages}
            </button>
          </li>
          <li className='flex items-center'>
            <button className='outline-0
            hover:text-cyan w-8'
            onClick={nextPage}>
              <img className='w-full h-auto' src={paginationArrow} alt='right'/>
            </button>
          </li>
          </>
          ) :
          null
          }
        </ul>
      </div>
    </div>
  )
}

export default Pagination;