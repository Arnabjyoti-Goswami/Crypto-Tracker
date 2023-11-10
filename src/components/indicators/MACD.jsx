import { useLayoutEffect, useState } from 'react';
import LineIndicators from './LineIndicators.jsx';
import getEmaData from './utils/ema.js';

const MACD = ({priceData, volumeData, currency, period}) => {
  const [macdData, setMacdData] = useState();

  useLayoutEffect( () => {
    if(priceData) {
      let data = getMacdData(priceData, period);
      console.log('MACD Data', data);
      setMacdData(data);
    }
  }, [priceData] )

  const getMacdData = (priceData) => {
    const ema12 = getEmaData(priceData, 12);
    const ema26 = getEmaData(priceData, 26);
    const slowSignal = ema12.map( (item, index) => {
      return {
        date: item.date,
        prices: item.ema - ema26[index].ema, // it needs to be as prices so that it can be used in the getEmaData function again to get the fastSignal
      }
    } )
    const fastSignal = getEmaData(slowSignal, 9);
    const macd = slowSignal.map( (item, index) => {
      const date = item.date;
      const slowMacd = item.prices;
      const fastMacd = fastSignal[index].ema;
      return {
        date,
        slowMacd,
        fastMacd,
      }
    } );
    return macd;
  }

  return(
    <>
    {
    macdData ? 
      <LineIndicators isPercent={true} currency={currency} 
      data={macdData} types={['slowMacd', 'fastMacd']} />
    : null
    }
    </>
  )
}
export default MACD;