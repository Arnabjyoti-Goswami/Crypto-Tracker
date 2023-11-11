import { useContext } from 'react';
import { TrendingContext } from '../context/TrendingContext.jsx';
import TrendingCoin from '../components/TrendingCoin.jsx';

const Trending = () => {
  const { trendingData } = useContext(TrendingContext);

  return (
    <section className='w-[80%] h-full flex flex-col mt-16 mb-24 relative'>
      <div className='flex py-8 mt-9 border border-gray-100 rounded
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
      </div>
    </section>
  )
}

export default Trending