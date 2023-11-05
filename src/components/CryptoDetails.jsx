import { useContext, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { CryptoContext } from '../context/CryptoContext.jsx';
import SelectIcon from '../assets/SelectIcon.jsx';

const CryptoDetails = () => {
  let { coinId } = useParams();
  let { getCoinData, coinData:data, currency } = useContext(CryptoContext);
  let navigate = useNavigate();

  const closePopUp = () => {
    navigate('..');
  }

  useLayoutEffect(() => {
    getCoinData(coinId);
  }, [coinId])

  return ReactDOM.createPortal(
    <div className='fixed top-0 w-full h-full
    bg-gray-200 bg-opacity-30 backdrop-blur-sm
    flex items-center justify-center font-nunito'
    onClick={closePopUp}>
      <div className='w-[65%] h-[75%] relative rounded-lg
      bg-gray-300 bg-opacity-75 text-white'
      onClick={ (e) => {
        e.stopPropagation()
      } }>
      {
        data
        ? (
        <div className='flex items-center justify-between h-full w-full p-4'>
          <div className='flex flex-col w-[45%] h-full pr-2'>
            <div className='flex w-full items-center'>
              <img src={data.image.large} alt={data.id} 
              className='w-[3rem] h-[3rem] mx-1.5'/>
              <h1 className='text-xl capitalize font-medium'>
                {data.name}
              </h1>
              <span className='text-sm py-0.5 px-2.5 ml-2
              text-cyan bg-cyan bg-opacity-25
              rounded uppercase'>
                {data.symbol}
              </span>
            </div>
            <div className='flex w-full mt-6'>
              <div className='flex flex-col w-full'>
                <div className='flex justify-between'>
                  <span className='text-sm capitalize text-gray-100'>
                    Price
                  </span>
                  <div className={`text-sm px-1 ml-2 font-medium
                  flex items-center rounded uppercase
                  bg-opacity-25
                  ${
                    data.market_data.price_change_percentage_24h > 0 
                    ? 'bg-green text-green' : 
                    'bg-red text-red'
                  } 
                  `}>
                    <span>
                      {Number(data.market_data.price_change_percentage_24h).toFixed(2)}%
                    </span>
                    <SelectIcon upTrend={
                      data.market_data.price_change_percentage_24h > 0
                    }/>
                  </div>
                </div>
                <h2 className='text-lg font-bold'>
                {  
                new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: currency,
                  maximumFractionDigits: data.current_price < 1
                  ? 6
                  : data.current_price >= 1 && data.current_price < 10
                    ? 5
                    : data.current_price >= 10 && data.current_price < 100
                      ? 4
                      : data.current_price >= 100 && data.current_price < 1000
                        ? 3
                        : 2
                }).format(data.market_data.current_price[currency])
                }
                </h2>
              </div>
            </div>
            <div className='flex w-full mt-4 justify-between'>
              <div className='flex flex-col'>
                <span className='text-sm capitalize text-gray-100'>
                  Market Cap
                </span>
                <h2 className='text-base font-bold'>
                {  
                new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: currency,
                  maximumFractionDigits: 2,minimumFractionDigits: 0,
                }).format(data.market_data.market_cap[currency])
                }
                </h2>
              </div>
              <div className='flex flex-col'>
                <span className='text-sm capitalize text-gray-100'>
                  fully diluted valuation
                </span>
                <h2 className='text-base font-bold'>
                {  
                new Intl.NumberFormat('en', {
                  style: 'currency',
                  currency: currency,
                  notation: 'compact',
                }).format(data.market_data.fully_diluted_valuation[currency])
                }
                </h2>
              </div>
            </div>
            <div className='flex flex-col w-full mt-4 justify-between'>
              <span className='text-sm capitalize text-gray-100'>
                total volume
              </span>
              <h2 className='text-base font-bold'>
              {  
              new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: currency,
                maximumFractionDigits: 2,
                minimumFractionDigits: 0,
              }).format(data.market_data.total_volume[currency])
              }
              </h2>
            </div>
          </div>

          <div className='flex flex-col w-[55%] h-full pl-3 bg-green'>
            Right
          </div>
        </div>
        ) :
        null
      }
      </div>
    </div> ,
    document.getElementById("model")
  )
}

export default CryptoDetails;