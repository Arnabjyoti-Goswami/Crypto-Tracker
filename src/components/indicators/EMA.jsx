import { useLayoutEffect, useState } from 'react';
import LineIndicators from './LineIndicators.jsx';

const EMA = ({priceData, volumeData, currency, period}) => {
  const [emaData, setEmaData] = useState();

  useLayoutEffect( () => {
    if(priceData && volumeData) {
      let data = getEmaData(priceData, period);
      console.log('EMA Data', data);
      setEmaData(data);
    }
  }, [priceData] )

  const getEmaData = (priceData, period) => {
    const smoothing = 2;
    const alpha = smoothing / (period + 1);
    const emaData = [];
    emaData.push({
      ema: priceData[0].prices,
      date: priceData[0].date,
    });
    for (let i = 1; i < priceData.length; i++) {
      const price = priceData[i].prices;
      const emaPrev = emaData[i - 1].ema;
      const ema = alpha * price + (1 - alpha) * emaPrev;
      emaData.push({
        ema: ema,
        date: priceData[i].date,
      });
    }
    return emaData;
  };

  return(
    <>
    {
    emaData ? 
      <LineIndicators data={emaData} currency={currency} type={'ema'} isPercent={false} />
    : null
    }
    </>
  )
}

export default EMA;
