import { useContext, useLayoutEffect, useState } from 'react';
import { CryptoContext }  from '../context/CryptoContext.jsx';
import LineRecharts from './LineRecharts.jsx';
import BarRecharts from './BarRecharts.jsx';
import { IndicatorSelector, IndicatorGraph } from './indicators/Indicators.jsx';

const Chart = ({id}) => {
  const { currency } = useContext(CryptoContext);
  const [days, setDays] = useState(30);
  const [interval, setInterval] = useState('daily');
  const [chartDataType, setChartDataType] = useState('prices');
  const [pricesData, setPricesData] = useState();
  const [marketCapData, setMarketCapData] = useState();
  const [volumeData, setVolumeData] = useState();

  const getChartData = async (id) => {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}&precision=full`).then((res) => res.json()).then((json) => json);
      console.log(data);
      
      let pricesChartData = data.prices.map(item => {       
        return {
          date: new Date(item[0]).toLocaleDateString() ,
          prices : item[1] ,
        }
      });
      console.log('Prices Chart Data', pricesChartData);
      setPricesData(pricesChartData);

      let marketCapChartData = data.market_caps.map(item => {       
        return {
          date: new Date(item[0]).toLocaleDateString() ,
          market_caps : item[1] ,
        }
      });
      console.log('Market Cap Chart Data', marketCapChartData);
      setMarketCapData(marketCapChartData);

      let volumeChartData = data.total_volumes.map(item => {
        return {
          date: new Date(item[0]).toLocaleDateString() ,
          total_volumes: item[1] ,
        }
      });
      console.log('volumeChartData', volumeChartData);
      setVolumeData(volumeChartData);

    } catch (error) {
      console.log(error);
    }
  }

  useLayoutEffect( () => {
    getChartData(id);
  }, [id, days] );

  const dayOptions = [
    { label: '1d', days: 1 },
    { label: '14d', days: 14 },
    { label: '30d', days: 30 },
    { label: '90d', days: 90 },
    { label: '365d', days: 365 },
    { label: 'full', days: 'max' },
  ];

  const chartDataTypeOptions = [
    { label: 'price', type: 'prices' },
    { label: 'market cap', type: 'market_caps' },
  ];

  return (
    <div className='w-full h-full relative'>
      <div className='w-full h-[60%]'>
        {
        (pricesData && marketCapData && volumeData) ? (
          <>
            <LineRecharts data={
              (chartDataType === 'prices') ? pricesData : marketCapData
              } marketCapData={marketCapData} currency={currency} type={chartDataType} />
            <BarRecharts data={volumeData} currency={currency} />
          </>
        ) : null
        }
        <div className='flex items-center mt-2 mb-1'>
          {
          chartDataTypeOptions.map( (option, index) => (
            <button key={index}
            onClick={ () => {
              setChartDataType(option.type)
            } }
            className={`
            capitalize bg-opacity-25 rounded 
            py-0.5 px-1.5 ml-2 text-sm h-[5%]
            ${chartDataType === option.type ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'} 
            `}>
              {option.label}
            </button>
          ) )
          }
          <IndicatorSelector />
          <div className='grid grid-cols-3 ml-auto pr-[1%]'>
            {
            dayOptions.map( (option, index) => (
              <button key={index}
              className={`text-sm p-[1%]
              border-t
              ${index >= dayOptions.length - 3 ? 'border-b ' : ''}
              border-l
              ${(index + 1) % 3 === 0 ? 'border-r ' : ''}
              ${index === 0 ? 'rounded-tl ': ''}
              ${index === 2 ? 'rounded-tr ': ''}
              ${index === (dayOptions.length - 3) ? 'rounded-bl ': ''}
              ${index === (dayOptions.length - 1) ? 'rounded-br ': ''}
              ${days === option.days ? 'bg-cyan text-cyan border-cyan border-opacity-25' : 'bg-gray-200 text-gray-100 border-gray-200'}
              bg-opacity-25
              `}
              onClick={ () => {
                setDays(option.days) 
              } }
              >
                {option.label}
              </button>
            ) )
            }
          </div>
        </div>
        <IndicatorGraph priceData={pricesData} volumeData={volumeData} currency={currency} />
      </div>
    </div>
  );
}

export default Chart;