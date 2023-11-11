import { useNavigate } from 'react-router-dom';
import formatPrice from '../utils/formatPrice.js';

const TrendingCoin = ({data}) => {
  let navigate = useNavigate();

  const getCoinDetails = (id) => {
    navigate(id);
  }

  const getDetails = (coinData) => [
    { label: 'name', data: coinData.name},
    { label: 'market cap rank:', data: coinData.market_cap_rank},
    { label: 'price (in btc):', data: formatPrice(coinData.price_btc, 'btc', 10)},
    { label: 'trending rank:', data: coinData.score + 1},
  ];

  return (
    <div className='relative p-4 w-[40%] bg-gray-200 
    mb-12 last:mb-0 rounded-lg cursor-pointer
    hover:bg-gray-100 hover:bg-opacity-40
    s:w-[80%]'
    onClick={() => getCoinDetails(data.id)}>
      {
      getDetails(data).map( (item, index) => (
      <h3 className='text-base flex items-center my-0.5'
      key={`detail #${index}`}>
        <span className='text-gray-100 capitalize'>
          {item.label}&nbsp;
        </span>
        <span className='text-cyan'>
          {item.data}
        </span>
        {
        item.label === 'name' ? (
          <img src={data.small} alt={data.name}
          className='w-[1.5rem] h-[1.5rem] mx-1.5 rounded-full' />
        ) : null
        }
      </h3>
      ) )
      }
      {
      data.large ? (
        <img src={data.large} alt={data.name}
        className='w-[25%] h-auto rounded-full absolute
        top-1/2 right-[2px] -translate-y-1/2 hidden lg:inline-block' />
      ) : null 
      }
    </div>
  )
}

export default TrendingCoin;