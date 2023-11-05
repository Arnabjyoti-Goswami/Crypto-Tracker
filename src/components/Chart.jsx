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
  }, [id, chartDataType] );

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
      </div>
    </div>
  );
}

export default Chart;