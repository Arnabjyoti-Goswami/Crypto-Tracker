import { useContext } from 'react';
import { TrendingContext } from '../context/TrendingContext.jsx';

const Trending = () => {
  const { trendingData } = useContext(TrendingContext);

  return (
    <section className='w-[80%] h-full flex flex-col mt-16 mb-24 relative'>
      <div className='flex py-8 mt-9 border border-gray-100 rounded
      flex-wrap justify-evenly w-full min-h-[60vh]'>
      {
      trendingData ? (
        'trending'
      ) : null
      }
      </div>
    </section>
  )
}

export default Trending