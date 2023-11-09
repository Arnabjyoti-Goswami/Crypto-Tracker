import { useLayoutEffect, useState } from 'react';
import LineIndicators from './LineIndicators.jsx';

const RSI = ({ priceData, volumeData, currency, period }) => {
  period -= 1; // convert to 0 indexing
  console.log('priceData', priceData)
  const [rsiData, setRsiData] = useState();

  useLayoutEffect( () => {
    if(priceData) {
      let data = getRsiData(priceData, period);
      console.log('RSI Data', data);
      setRsiData(data);
    }
  }, [priceData] )

  const getRsiData = (priceData, period) => {
    return priceData.map( (priceItem, index) => {
      const date = priceItem.date;
      let avgGain = 0, avgLoss = 0;

      let lowerLimit = 0;
      if(index > period) {
        lowerLimit = index - period;
      } else {
        lowerLimit = 1;
      }

      for(let i = lowerLimit; i < index; i++) {
        let gain = priceData[i].prices - priceData[i-1].prices;
        if(gain > 0) {
          avgGain += gain;
        } else if (gain < 0) {
          gain *= -1;
          avgLoss += gain;
        }
      }
      avgGain /= period;
      avgLoss /= period;

      const rs = avgGain / avgLoss;
      const rsi = 100 * ( 1 - (1 / (1 + rs)) );
      
      return {
        data: date,
        rsi: rsi,
      }
    } )
  }

  return(
    <>
    {
    rsiData ? 
      <LineIndicators data={rsiData} currency={currency} type={'rsi'} />
    : null
    }
    </>
  )
}

export default RSI;
