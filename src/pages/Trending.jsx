import { useContext } from 'react';
import { TrendingContext } from '../context/';
import TrendingCoin from '../components/TrendingCoin.jsx';
import { Outlet } from 'react-router-dom';
import { ResetIcon } from '../assets/';

const Trending = () => {
  const { trendingData, resetTrendingPage } = useContext(TrendingContext);

  return (
    <section className='w-[80%] h-full flex flex-col mt-16 mb-24 relative'>
      <div className='flex py-8 border border-gray-100 rounded
      flex-wrap justify-evenly w-full min-h-[60vh]
      s:flex-col s:justify-center s:items-center'>
      {
      trendingData ? (
        trendingData.map( (data, index) => 
          <TrendingCoin key={`Trending Coin #${index}`} 
          data={data.item} />
        )
      ) : null
      }
        <button className='w-[2rem] ml-4
        hover:scale-110 transition-all transition-ease
        absolute right-0 -top-10'
        onClick={resetTrendingPage}>
          <ResetIcon />
        </button>
      </div>
    <Outlet />
    </section>
  )
}

export default Trending;