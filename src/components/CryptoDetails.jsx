import { useContext, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { CryptoContext } from '../context/CryptoContext.jsx';

const CryptoDetails = () => {
  let { coinId } = useParams();
  let { getCoinData, coinData:data } = useContext(CryptoContext);
  let navigate = useNavigate();

  const closePopUp = () => {
    navigate('..');
  }

  useLayoutEffect(() => {
    getCoinData(coinId);
  }, [coinId])

  return ReactDOM.createPortal(
    <div className='fixed top-0 w-full h-full
    bg-gray-200 bg-opacity-30 backdrop-blur-sm
    flex items-center justify-center font-nunito'
    onClick={closePopUp}>
      <div className='w-[65%] h-[75%] relative rounded-lg
      bg-gray-300 bg-opacity-75 text-white'
      onClick={ (e) => {
        e.stopPropagation()
      } }>
      {
        data
        ? (
        <div className='flex items-center justify-between h-full w-full p-4'>
          <div className='flex flex-col w-[45%] h-full pr-2'>
            <div className='flex w-full items-center'>
              <img src={data.image.large} alt={data.id} 
              className='w-[3rem] h-[3rem] mx-1.5'/>
              <h1 className='text-xl capitalize font-medium'>
                {data.name}
              </h1>
              <span className='text-sm py-0.5 px-2.5 ml-2
              text-cyan bg-cyan bg-opacity-25
              rounded uppercase'>
                {data.symbol}
              </span>
            </div>
          </div>
          <div className='flex flex-col w-[55%] h-full pl-3 bg-green'>
            Right
          </div>
        </div>
        ) :
        null
      }
      </div>
    </div> ,
    document.getElementById("model")
  )
}

export default CryptoDetails;