import { StorageContext } from '../context/';
import { useContext } from 'react';
import { StarIcon } from '../assets/';
import { useNavigate } from 'react-router-dom';
import formatPrice from '../utils/formatPrice.js';
import Loading from './Loading.jsx';

const SaveButton = ({data}) => {
  const { allCoins, saveCoin, removeCoin } = useContext(StorageContext);

  const handleClick = (e) => {
    e.preventDefault();
    if(allCoins.includes(data.id)){
      removeCoin(data.id);
    } else {
      saveCoin(data.id);
    }
  }

  return (
    <button className='outline-0 border-0 bg-none cursor-pointer'
    onClick={(e) => handleClick(e)}>
      <StarIcon borderHighLighted={
        allCoins.includes(data.id)
      } />
    </button>
  );
}

const TableComponent = ({data:cryptoData, currency}) => {
  let navigate = useNavigate();
  const handleNavigate = (e, coinId) => {
    e.preventDefault();
    navigate(coinId);
  }

  return (
    <div className='flex flex-col mt-9 border border-gray-100 rounded'>
      {
      cryptoData ? 
      <table className='w-full table-auto'>
        <thead className='capitalize text-base text-gray-100 font-medium border-b border-gray-100 relative'>
          <tr>
            <th className='py-1 absolute left-[5%] m:left-[10%]'>asset</th>
            <th className='py-1 s:hidden'>name</th>
            <th className='py-1'>price</th>
            <th className='py-1 s:hidden'>total volume</th>
            <th className='py-1 m:hidden'>market cap change</th>
            <th className='py-1 l:hidden'>1H</th>
            <th className='py-1 l:hidden'>24H</th>
            <th className='py-1 l:hidden'>7D</th>
          </tr>
        </thead>
        <tbody>
        {
        cryptoData.map(data => {
          return(
          <tr key={data.id} className='text-center text-base border-b border-gray-100 
          hover:bg-gray-200 last:border-b-0'>
            <td className='py-4 flex pl-2 items-center uppercase'>
              <SaveButton data={data} />
              <img className='w-[1.2rem] h-[1.2rem] mx-1.5' 
              src={data.image} alt={data.name} />
              <span className='cursor-pointer'
              onClick={
                (e) => handleNavigate(e, data.id)
              }>
                {data.symbol}
              </span>
            </td>
            <td className='py-4 s:hidden'>
              <span className='cursor-pointer'
              onClick={
                (e) => handleNavigate(e, data.id)
              }>
                {data.name}
              </span>
            </td>
            <td className='py-4'>
            {
              formatPrice(data.current_price, currency)
            }
            </td>
            <td className='py-4 s:hidden'>
            {
              new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(data.total_volume)
            }
            </td>
            <td className={`
            m:hidden py-4
            ${data.market_cap_change_percentage_24h > 0 ? 
              'text-green' : 'text-red'}
            `}>
              {Number(data.market_cap_change_percentage_24h).toFixed(6).replace(/\.?0*$/, '')}%
            </td>
            <td className={`
            l:hidden py-4
            ${data.price_change_percentage_1h_in_currency > 0 ? 
              'text-green': 'text-red'}
            `}>
              {Number(data.price_change_percentage_1h_in_currency).toFixed(4)}%
            </td>
            <td className={`
            l:hidden py-4
            ${data.price_change_percentage_24h_in_currency > 0 ? 
              'text-green': 'text-red'}
            `}>
              {Number(data.price_change_percentage_24h_in_currency).toFixed(4)}%
            </td>
            <td className={`
            l:hidden py-4
            ${data.price_change_percentage_7d_in_currency > 0 ? 
              'text-green': 'text-red'}
            `}>
              {Number(data.price_change_percentage_7d_in_currency).toFixed(4)}%
            </td>
          </tr>
          )
        })
        }
        </tbody>
      </table> 
      : <Loading classNames='min-h-[60vh]' />
      }
    </div>
  )
}

export default TableComponent;