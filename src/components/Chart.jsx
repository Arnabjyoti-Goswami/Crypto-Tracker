import { useContext, useLayoutEffect, useState } from 'react';
import { CryptoContext }  from '../context/CryptoContext.jsx';
import LineRecharts from './LineRecharts.jsx';

const Chart = ({id}) => {
  const { currency } = useContext(CryptoContext);
  const [days, setDays] = useState(30);

  const [chartData, setChartData] = useState();

  const getChartData = async (id) => {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=daily&precision=full`).then((res) => res.json()).then((json) => json);
      console.log(data);
      
      let convertedPricesData = data.prices.map(item => {       
        return {
          date: new Date(item[0]).toLocaleDateString() ,
          prices: item[1] ,
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
  }, [id] );

  return (
    <div className='w-full h-[60%]'>
      <LineRecharts data={chartData} />
    </div>
  );
}

export default Chart;