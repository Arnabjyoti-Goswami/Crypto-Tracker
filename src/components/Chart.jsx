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

  return (
    <div className='w-full h-[60%]'>
      {
      chartData ? (
        <LineRecharts data={chartData} currency={currency} type={chartDataType} />
      ) : null
      }
      <div className='flex'>
        <button onClick={() => {
          setChartDataType('prices')
        }}
        className='capitalize'>
          price
        </button>
        <button onClick={() => {
          setChartDataType('market_caps')
        }}
        className='capitalize'>
          market cap
        </button>
        <button onClick={() => {
          setChartDataType('total_volumes')
        }}
        className='capitalize'>
          volume
        </button>
        <div className='grid grid-cols-3'>
          {
          dayOptions.map( (option, index) => (
            <button key={index}
            className={`text-sm p-[1%]
            border-t
            ${index >= dayOptions.length - 3 ? 'border-b ' : ''}
            border-l
            ${(index + 1) % 3 === 0 ? 'border-r ' : ''}
            border-gray-100
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