import { useContext, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import { CryptoContext } from '../context/CryptoContext.jsx';

const CryptoDetails = () => {
  let { coinId } = useParams();
  let { getCoinData, coinData } = useContext(CryptoContext);

  useLayoutEffect(() => {
    getCoinData(coinId);
  }, [coinId])

  return ReactDOM.createPortal(
    <div className='fixed top-0 w-full h-full
    bg-gray-200 bg-opacity-30 backdrop-blur-sm
    flex items-center justify-center font-nunito'>
      <div className='w-[65%] h-[75%] relative rounded-lg
      bg-gray-300 bg-opacity-75 text-white'>
      {
        coinData
        ? (
          <h1>{coinData.id}</h1>
        ) :
        null
      }
      </div>
    </div> ,
    document.getElementById("model")
  )
}

export default CryptoDetails;