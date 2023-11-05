import { useContext, useLayoutEffect, useState } from 'react';
import { CryptoContext }  from '../context/CryptoContext.jsx';
import LineRecharts from './LineRecharts.jsx';

const Chart = ({id}) => {
  const { currency } = useContext(CryptoContext);
  const [days, setDays] = useState(30);
  const [interval, setInterval] = useState('daily');
  const [chartDataType, setChartDataType] = useState('prices');
  const [chartData, setChartData] = useState();

  const getChartData = async (id) => {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=daily&precision=full`).then((res) => res.json()).then((json) => json);
      console.log(data);
      
      let convertedPricesData = data[chartDataType].map(item => {       
        return {
          date: new Date(item[0]).toLocaleDateString() ,
          [chartDataType]: item[1] ,
        }
      });
      console.log("chart-data", convertedPricesData);
      setChartData(convertedPricesData);
    } catch (error) {
      console.log(error);
    }
  }

  useLayoutEffect( () => {
    getChartData(id);
  }, [id, chartDataType, days] );

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
    { label: 'volume', type: 'total_volumes' },
  ];

  return (
    <div className='w-full h-[60%]'>
      {
      chartData ? (
        <LineRecharts data={chartData} currency={currency} type={chartDataType} />
      ) : null
      }
      <div className='flex items-center'>
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
    </div>
  );
}

export default Chart;