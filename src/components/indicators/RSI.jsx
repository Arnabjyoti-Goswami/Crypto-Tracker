import { useLayoutEffect, useState } from 'react';
import LineIndicators from './LineIndicators.jsx';
import rollingAverage from './rollingAverage.js';

const RSI = ({ priceData, volumeData, currency, period }) => {
  const [rsiData, setRsiData] = useState();

  useLayoutEffect( () => {
    if(priceData) {
      let data = getRsiData(priceData, period);
      console.log('RSI Data', data);
      setRsiData(data);
    }
  }, [priceData] )

  const getRsiData = (priceData, period) => {
    const result = [];

    result.push({
      date: priceData[0].date,
      rsi: 0,
    })

    const gains = [], losses = [];
    for (let i = 1; i < priceData.length; i++) {
      const price = priceData[i].prices;
      const prevPrice = priceData[i-1].prices;
      if (price > prevPrice) {
        gains.push(price - prevPrice);
        losses.push(0);
      } else if (price === prevPrice) {
        gains.push(0);
        losses.push(0);
      } else {
        losses.push(prevPrice - price);
        gains.push(0);
      }
    }

    const avgGains = rollingAverage(gains, period);
    const avgLosses = rollingAverage(losses, period);

    for (let i = 1; i < priceData.length; i++) {
      const rs = avgGains[i-1] / avgLosses[i-1];
      const rsiValue = 100 * ( 1 - (1 / (1 + rs)) );
      result.push({
        date: priceData[i].date,
        rsi: rsiValue,
      });
    }

    return result;
  }

  return(
    <>
    {
    rsiData ? 
      <LineIndicators data={rsiData} currency={currency} type={'rsi'} isPercent={true} />
    : null
    }
    </>
  )
}

export default RSI;
