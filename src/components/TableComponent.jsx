import { StorageContext } from '../context/';
import { useContext } from 'react';
import { StarIcon } from '../assets/';
import { Link } from 'react-router-dom';
import formatPrice from '../utils/formatPrice.js';

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
  return (
    <div className='flex flex-col mt-9 border border-gray-100 rounded'>
      {
      cryptoData ? 
      <table className='w-full table-auto'>
        <thead className='capitalize text-base text-gray-100 font-medium border-b border-gray-100'>
          <tr>
            <th className='py-1'>asset</th>
            <th className='py-1'>name</th>
            <th className='py-1'>price</th>
            <th className='py-1'>total volume</th>
            <th className='py-1'>market cap change</th>
            <th className='py-1'>1H</th>
            <th className='py-1'>24H</th>
            <th className='py-1'>7D</th>
          </tr>
        </thead>
        <tbody>
        {
        cryptoData.map(data => {
          return(
          <tr key={data.id} className='text-center text-base border-b border-gray-100 hover:bg-gray-200 last:border-b-0'>
            <td className='py-4 flex items-center uppercase'>
              <SaveButton data={data} />
              <img className='w-[1.2rem] h-[1.2rem] mx-1.5' src={data.image} alt={data.name} />
              <span>
                <Link to={`/${data.id}`} className='cursor-pointer'>
                  {data.symbol}
                </Link>
              </span>
            </td>
            <td className='py-4'>
              <Link to={`/${data.id}`} className='cursor-pointer'>
                {data.name}
              </Link>
            </td>
            <td className='py-4'>
            {
              formatPrice(data.current_price, currency)
            }
            </td>
            <td className='py-4'>
              {data.total_volume}
            </td>
            <td className='py-4'>
              {Number(data.market_cap_change_percentage_24h).toFixed(6).replace(/\.?0*$/, '')}%
            </td>
            <td className={
              data.price_change_percentage_1h_in_currency > 0 ? 
              'text-green py-4': 'text-red py-4'
            }>
              {Number(data.price_change_percentage_1h_in_currency).toFixed(4)}
            </td>
            <td className={
              data.price_change_percentage_24h_in_currency > 0 ? 
              'text-green py-4': 'text-red py-4'
            }>
              {Number(data.price_change_percentage_24h_in_currency).toFixed(4)}
            </td>
            <td className={
              data.price_change_percentage_7d_in_currency > 0 ? 
              'text-green py-4': 'text-red py-4'
            }>
              {Number(data.price_change_percentage_7d_in_currency).toFixed(4)}
            </td>
          </tr>
          )
        })
        }
        </tbody>
      </table> 
      : null
      }
    </div>
  )
}

export default TableComponent;