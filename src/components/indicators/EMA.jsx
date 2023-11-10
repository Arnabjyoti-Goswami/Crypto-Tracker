import { useLayoutEffect, useState } from 'react';
import LineIndicators from './LineIndicators.jsx';
import getEmaData from './utils/ema.js';

const EMA = ({priceData, volumeData, currency, period}) => {
  const [emaData, setEmaData] = useState();

  useLayoutEffect( () => {
    if(priceData && volumeData) {
      let data = getEmaData(priceData, period);
      console.log('EMA Data', data);
      setEmaData(data);
    }
  }, [priceData] )

  return(
    <>
    {
    emaData ? 
      <LineIndicators isPercent={false} currency={currency} 
      data={emaData} types={['ema']} />
    : null
    }
    </>
  )
}

export default EMA;
