import { useLayoutEffect, useState } from 'react';
import LineIndicators from './LineIndicators.jsx';

const OBV = ({priceData, volumeData, currency, period}) => {
  const [obvData, setObvData] = useState();

  useLayoutEffect( () => {
    if(priceData && volumeData) {
      let data = getOBVData(priceData, volumeData);
      console.log('OBV Data', data);
      setObvData(data);
    }
  }, [priceData, volumeData] )

  const getOBVData = (priceData, volumeData) => {
    let obv = 0;
    return priceData.map( (priceItem, index) => {
      const date = priceItem.date;
      const price = priceItem.prices;
      const volume = volumeData[index].total_volumes;

      if (index === 0) {
        obv = 0;
      } else {
        if (price > priceData[index - 1].prices) {
          obv += volume;
        } else if (price < priceData[index - 1].prices) {
          obv -= volume;
        }
      }
      return {
        date: date ,
        obv : obv ,
      }
    } );
  }

  return(
    <>
    {
    obvData ? 
      <LineIndicators data={obvData} currency={currency} type={'obv'} isPercent={false} />
    : null
    }
    </>
  )
}

export default OBV;